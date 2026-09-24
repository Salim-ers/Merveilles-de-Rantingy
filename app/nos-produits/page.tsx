import type { Metadata } from 'next';
import { PageHead } from '@/components/sections/PageHead';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { FinaleCTA } from '@/components/sections/FinaleCTA';
import { media } from '@/data/media';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'La vitrine : pains, pâtisseries, flans, gâteaux',
  description:
    'Pains, viennoiseries, macarons géants, entremets, flans pâtissiers, tartes, gâteaux d’occasion, sandwichs et boissons : la vitrine d’Aux Merveilles de Rantigny.',
  alternates: { canonical: '/nos-produits' },
  openGraph: {
    title: 'La vitrine d’Aux Merveilles de Rantigny',
    description: 'Macarons géants, entremets miroir, flans pâtissiers et tartes à partager.',
    url: '/nos-produits',
    images: [{ url: media.macarons.src, width: 1254, height: 1254, alt: media.macarons.alt }],
  },
};

export default function ProduitsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'La vitrine', path: '/nos-produits' }])),
        }}
      />
      <PageHead
        kicker="La vitrine"
        title={<>Rayon <span className="it">par rayon</span></>}
        lead="Tout ce qui passe par les comptoirs de la boutique. Pas de prix affichés ici : ils sont donnés en boutique, et les pièces présentées varient selon les jours."
        image="macarons"
        pos="45% 58%"
      />
      <ProductGrid />
      <FinaleCTA />
    </>
  );
}
