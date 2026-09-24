import type { Metadata, Viewport } from 'next';
import { Anton, Archivo, Instrument_Serif } from 'next/font/google';
import './globals.css';

import { TopBar } from '@/components/layout/TopBar';
import { Foot } from '@/components/layout/Foot';
import { Dock } from '@/components/layout/Dock';
import { Motion } from '@/components/animations/Motion';
import { site } from '@/data/site';
import { media } from '@/data/media';
import { bakerySchema, jsonLd } from '@/lib/schema';

/**
 * Typographies : Anton (affiche, enseigne, étiquette), Instrument Serif italique
 * (la gourmandise dans les titres), Archivo (texte courant).
 */
const display = Anton({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' });
const serif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
const text = Archivo({ subsets: ['latin'], variable: '--font-text', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Aux Merveilles de Rantigny · Boulangerie-pâtisserie à Rantigny (Oise)',
    template: '%s · Aux Merveilles de Rantigny',
  },
  description: site.shortDescription,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: site.name,
    url: '/',
    title: 'Aux Merveilles de Rantigny · Boulangerie-pâtisserie',
    description: 'Macarons géants, entremets miroir, flans et gâteaux d’occasion, avenue de Rantigny.',
    images: [{ url: media.entremetsFruits.src, width: 1254, height: 1254, alt: media.entremetsFruits.alt }],
  },
  twitter: { card: 'summary_large_image' },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: '#1B1714', viewportFit: 'cover', colorScheme: 'light' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${serif.variable} ${text.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(bakerySchema()) }} />
        <a className="evitement" href="#contenu">Aller au contenu</a>
        <TopBar />
        <main id="contenu" tabIndex={-1}>{children}</main>
        <Foot />
        <Dock />
        <Motion />
      </body>
    </html>
  );
}
