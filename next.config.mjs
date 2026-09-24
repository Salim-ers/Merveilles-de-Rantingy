const isDev = process.env.NODE_ENV !== 'production';
const isPreview = process.env.VERCEL_ENV === 'preview';
const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

const TURNSTILE = 'https://challenges.cloudflare.com';
const VERCEL_LIVE = 'https://vercel.live';

/**
 * Content-Security-Policy.
 * - 'unsafe-inline' reste nécessaire pour les scripts d'hydratation injectés par Next.js
 *   sur des pages statiques (une CSP à nonce forcerait le rendu dynamique de chaque page).
 * - Aucune ressource tierce hors Turnstile (optionnel) et la barre de prévisualisation Vercel.
 */
const csp = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev && "'unsafe-eval'",
    turnstile && TURNSTILE,
    isPreview && VERCEL_LIVE,
  ].filter(Boolean).join(' '),
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  ["connect-src 'self'", turnstile && TURNSTILE, isPreview && VERCEL_LIVE].filter(Boolean).join(' '),
  turnstile || isPreview
    ? ['frame-src', turnstile && TURNSTILE, isPreview && VERCEL_LIVE].filter(Boolean).join(' ')
    : "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  !isDev && 'upgrade-insecure-requests',
].filter(Boolean).join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1254],
    imageSizes: [96, 160, 240, 320],
    qualities: [72, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
