import 'server-only';

/**
 * Envoi d'e-mail via l'API Resend, exclusivement côté serveur.
 * Variables (Vercel → Settings → Environment Variables, jamais NEXT_PUBLIC_) :
 *   RESEND_API_KEY      clé secrète Resend
 *   CONTACT_TO_EMAIL    adresse de la boutique qui reçoit les demandes
 *   CONTACT_FROM_EMAIL  expéditeur sur un domaine vérifié chez Resend
 */

type Mail = { subject: string; text: string; replyTo?: string };
type Result = { ok: true } | { ok: false; reason: string };

export async function sendMail(mail: Mail): Promise<Result> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) return { ok: false, reason: 'envoi non configuré' };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject: mail.subject,
        text: mail.text,
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return { ok: false, reason: `fournisseur HTTP ${response.status}` };
    return { ok: true };
  } catch {
    return { ok: false, reason: 'fournisseur injoignable' };
  }
}
