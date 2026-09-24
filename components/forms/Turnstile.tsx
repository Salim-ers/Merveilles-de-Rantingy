import Script from 'next/script';

/**
 * Cloudflare Turnstile, OPTIONNEL : activé uniquement si NEXT_PUBLIC_TURNSTILE_SITE_KEY
 * (clé publique) et TURNSTILE_SECRET_KEY (clé secrète, serveur) sont définies.
 * À n'activer qu'en cas de spam : sans JavaScript, le formulaire ne pourra plus être envoyé.
 */
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function Turnstile() {
  if (!siteKey) return null;
  return (
    <>
      <div className="cf-turnstile" data-sitekey={siteKey} data-language="fr" />
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
    </>
  );
}
