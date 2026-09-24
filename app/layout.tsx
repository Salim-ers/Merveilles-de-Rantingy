import type { Metadata, Viewport } from 'next';
import { Fraunces, Karla } from 'next/font/google';
import './globals.css';

import { TopBar } from '@/components/layout/TopBar';
import { Foot } from '@/components/layout/Foot';
import { Dock } from '@/components/layout/Dock';
import { Motion } from '@/components/animations/Motion';
import { site } from '@/data/site';
import { bakerySchema } from '@/lib/schema';

const display = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-display-next', display: 'swap' });
const ui = Karla({ subsets: ['latin'], variable: '--font-ui-next', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Aux Merveilles de Rantigny | Boulangerie Pâtisserie à Rantigny (60)',
    template: '%s | Aux Merveilles de Rantigny',
  },
  description: site.shortDescription,
  alternates: { canonical: '/' },
  keywords: [
    'boulangerie Rantigny', 'pâtisserie Rantigny', 'boulangerie pâtisserie Rantigny',
    'boulangerie Oise', 'sandwich Rantigny', 'gâteau anniversaire Rantigny',
    'boulangerie ouverte dimanche Rantigny', 'Aux Merveilles de Rantigny',
  ],
  openGraph: {
    type: 'website', locale: 'fr_FR', siteName: site.name, url: site.url,
    title: 'Aux Merveilles de Rantigny | Boulangerie Pâtisserie',
    description: 'Une vitrine qui déborde, avenue de Rantigny. Ouvert de 6h30 à 20h, fermé le jeudi.',
    images: [{ url: '/images/boutique/aux-merveilles-rantigny-facade.webp', width: 1254, height: 1254, alt: 'Façade de la boulangerie Aux Merveilles de Rantigny' }],
  },
  twitter: { card: 'summary_large_image' },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#FBF5EC', viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${ui.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bakerySchema()) }} />
        <a className="skip" href="#c">Aller au contenu</a>
        <TopBar />
        <main id="c">{children}</main>
        <Foot />
        <Dock />
        <Motion />
      </body>
    </html>
  );
}
