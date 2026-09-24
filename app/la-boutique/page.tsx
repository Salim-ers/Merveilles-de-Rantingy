import type { Metadata } from 'next';
import { PageHead } from '@/components/sections/PageHead';
import { ShopBand } from '@/components/sections/ShopBand';
import { HoursCard } from '@/components/sections/HoursCard';
import { media } from '@/data/media';
import { site } from '@/data/site';
import { hoursSummary } from '@/lib/business-status';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'La boutique, avenue de Rantigny',
  description: `Boulangerie, pâtisserie et sandwicherie avenue de Rantigny (60290), depuis ${site.legal.since}. ${hoursSummary()}.`,
  alternates: { canonical: '/la-boutique' },
  openGraph: {
    title: 'La boutique · Aux Merveilles de Rantigny',
    description: 'Devanture noire, stores orange et comptoirs vitrés, avenue de Rantigny.',
    url: '/la-boutique',
    images: [{ url: media.interieur.src, width: 1254, height: 1254, alt: media.interieur.alt }],
  },
};

export default function BoutiquePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'La boutique', path: '/la-boutique' }])),
        }}
      />
      <PageHead
        kicker={`${site.address.street} · depuis ${site.legal.since}`}
        title={<>La <span className="it">boutique</span></>}
        lead="Une boulangerie-pâtisserie de quartier, ouverte six jours sur sept, du petit matin jusqu’au soir."
        image="interieur"
        pos="40% 60%"
      />

      <ShopBand withLink={false} />

      <section className="comptoir" aria-labelledby="trades-title">
        <div className="cadre">
          <h2 id="trades-title" className="d d-l">Au <span className="it">comptoir</span></h2>
          <ul className="comptoir-list">
            {site.activities.map((a) => <li key={a}>{a}</li>)}
          </ul>
          <p className="comptoir-note">
            Activités déclarées par l’entreprise. Ce qui est proposé varie selon les jours et les saisons :
            la boutique vous renseigne au {site.phone.display}.
          </p>
        </div>
      </section>

      <HoursCard />
    </>
  );
}
