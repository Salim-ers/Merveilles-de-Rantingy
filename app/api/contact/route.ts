import { NextResponse } from 'next/server';
import { contactSchema, fieldErrors, orderSchema, type ContactInput, type OrderInput } from '@/lib/validation';
import { clientIp, rateLimit } from '@/lib/rate-limit';
import { sendMail } from '@/lib/mail';
import { site } from '@/data/site';

/**
 * Réception des demandes du site (commande de gâteau et message).
 *
 * - Fonctionne avec ou sans JavaScript : un envoi de formulaire classique est
 *   redirigé (303) vers une page de confirmation ; un appel fetch reçoit du JSON.
 * - Validation Zod côté serveur, honeypot, limitation de débit, Turnstile optionnel.
 * - Les erreurs renvoyées au navigateur sont génériques ; les journaux ne
 *   contiennent jamais de données personnelles.
 */

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 16 * 1024;
const HONEYPOT = 'site_web';

const GENERIC_ERROR = `L’envoi n’a pas abouti. Réessayez dans un instant ou appelez la boutique au ${site.phone.display}.`;

type Kind = 'commande' | 'contact';

function wantsJson(request: Request) {
  return (request.headers.get('accept') ?? '').includes('application/json');
}

function reply(request: Request, status: number, body: { ok: boolean; error?: string; fields?: Record<string, string> }) {
  if (wantsJson(request)) return NextResponse.json(body, { status });
  const target = body.ok ? '/demande-envoyee' : '/demande-non-envoyee';
  return NextResponse.redirect(new URL(target, request.url), 303);
}

/** Refuse les envois provenant d'une autre origine (protection CSRF basique). */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

async function readBody(request: Request): Promise<Record<string, string> | null> {
  const type = request.headers.get('content-type') ?? '';
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return null;

  if (type.includes('application/json')) {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
    return Object.fromEntries(
      Object.entries(data as Record<string, unknown>).filter(([, v]) => typeof v === 'string'),
    ) as Record<string, string>;
  }
  if (type.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  return null;
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    console.error('[demande] vérification Turnstile indisponible');
    return false;
  }
}

const frDate = (iso: string) => iso.split('-').reverse().join('/');

function orderMail(d: OrderInput) {
  return {
    subject: `Demande de gâteau — ${d.occasion} — ${frDate(d.date)}`,
    replyTo: d.email,
    text: [
      'Nouvelle demande de gâteau depuis le site.',
      'Rappel : rien n’est confirmé tant que la boutique n’a pas rappelé le client.',
      '',
      `Prénom : ${d.prenom}`,
      `Nom : ${d.nom}`,
      `Téléphone : ${d.telephone}`,
      `E-mail : ${d.email ?? '—'}`,
      '',
      `Date souhaitée : ${frDate(d.date)}`,
      `Nombre de personnes : ${d.personnes}`,
      `Occasion : ${d.occasion}`,
      `Création : ${d.creation}`,
      '',
      'Message :',
      d.message,
    ].join('\n'),
  };
}

function contactMail(d: ContactInput) {
  return {
    subject: 'Message depuis le site',
    replyTo: d.email,
    text: [
      'Nouveau message depuis le site.',
      '',
      `Prénom : ${d.prenom}`,
      `Nom : ${d.nom}`,
      `E-mail : ${d.email}`,
      `Téléphone : ${d.telephone ?? '—'}`,
      '',
      'Message :',
      d.message,
    ].join('\n'),
  };
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return reply(request, 403, { ok: false, error: GENERIC_ERROR });

  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY_BYTES) return reply(request, 413, { ok: false, error: GENERIC_ERROR });

  const ip = clientIp(request.headers);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    const res = reply(request, 429, {
      ok: false,
      error: `Trop d’envois en peu de temps. Réessayez plus tard ou appelez le ${site.phone.display}.`,
    });
    res.headers.set('Retry-After', String(limit.retryAfter));
    return res;
  }

  let body: Record<string, string> | null;
  try {
    body = await readBody(request);
  } catch {
    body = null;
  }
  if (!body) return reply(request, 400, { ok: false, error: GENERIC_ERROR });

  // Honeypot : un robot remplit le champ caché. On répond comme si tout allait bien.
  if ((body[HONEYPOT] ?? '').trim() !== '') return reply(request, 200, { ok: true });

  if (!(await verifyTurnstile(body['cf-turnstile-response'], ip))) {
    return reply(request, 400, { ok: false, error: 'La vérification anti-spam a échoué. Rechargez la page et réessayez.' });
  }

  const kind: Kind = body.formulaire === 'contact' ? 'contact' : 'commande';
  const parsed = kind === 'commande' ? orderSchema.safeParse(body) : contactSchema.safeParse(body);
  if (!parsed.success) {
    return reply(request, 422, {
      ok: false,
      error: 'Certains champs sont à corriger.',
      fields: fieldErrors(parsed.error),
    });
  }

  const mail = kind === 'commande' ? orderMail(parsed.data as OrderInput) : contactMail(parsed.data as ContactInput);
  const result = await sendMail(mail);

  if (!result.ok) {
    console.error(`[demande] ${kind} non transmise : ${result.reason}`);
    return reply(request, 503, { ok: false, error: GENERIC_ERROR });
  }
  return reply(request, 200, { ok: true });
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: 'POST' } });
}
