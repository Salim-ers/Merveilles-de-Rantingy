/**
 * Limitation de débit en mémoire (fenêtre glissante, par adresse IP).
 * Sur Vercel, chaque instance a sa propre mémoire : c'est une protection
 * « best effort » contre les rafales, complétée par le honeypot et,
 * si besoin, Turnstile. Pour une limite globale, brancher un stockage
 * partagé (ex. Upstash Redis) ici sans toucher à la route.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const MAX_KEYS = 5000;

const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()): { ok: boolean; retryAfter: number } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    const oldest = recent[0] ?? now;
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - oldest)) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
    if (hits.size > MAX_KEYS) hits.clear();
  }
  return { ok: true, retryAfter: 0 };
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || headers.get('x-real-ip') || 'unknown';
}
