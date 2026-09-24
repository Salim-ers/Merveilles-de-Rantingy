import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHead } from '@/components/sections/PageHead';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { HoursStrip } from '@/components/sections/HoursStrip';
import { FinaleCTA } from '@/components/sections/FinaleCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { media } from '@/data/media';

export const metadata: Metadata = {
  title: 'Nos produits',
  description: 'Pains, pâtisseries, entremets, tartes et flans, gâteaux sur commande, sandwichs et boissons : ce que propose Aux Merveilles de Rantigny.',
  alternates: { canonical: '/nos-produits' },
};

export default function ProduitsPage() {
  return (
    <>
      <PageHead
        crumb="Nos produits"
        title={<>Ce qu’il y a<br /><em>dans la vitrine.</em></>}
        lead="Le catalogue de la boutique, sans prix affichés : ils changent, et la boutique reste la mieux placée pour les donner."
        image={media.eclairsVitrine}
      />
      <HoursStrip />

      <section className="sec ivory">
        <div className="shell">
          <Eyebrow>Catalogue</Eyebrow>
          <Suspense fallback={<p className="lead">Chargement du catalogue…</p>}>
            <ProductGrid />
          </Suspense>
        </div>
      </section>

      <section className="sec cream" id="galerie">
        <div className="shell">
          <div className="head">
            <div>
              <Eyebrow>Galerie</Eyebrow>
              <h2 className="ti s2 rise" data-d=".05s">La vitrine,<br /><em>en photos.</em></h2>
            </div>
            <p className="lead rise" data-d=".1s" style={{ maxWidth: '32ch' }}>
              Toutes les photographies viennent de la boutique. Cliquez pour agrandir.
            </p>
          </div>
          <PhotoGrid />
        </div>
      </section>

      <FinaleCTA />
    </>
  );
}
