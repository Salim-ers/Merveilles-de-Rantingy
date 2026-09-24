import type { Metadata } from 'next';
import { OrderForm } from '@/components/forms/OrderForm';
import { Steps } from '@/components/sections/Steps';
import { Photo } from '@/components/ui/Photo';
import { media } from '@/data/media';
import { site } from '@/data/site';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Gâteau d’anniversaire et d’occasion à Rantigny',
  description:
    'Anniversaire, fête de famille, gâteau personnalisé : décrivez votre demande à Aux Merveilles de Rantigny. La boutique vous rappelle pour confirmer disponibilité, format et tarif.',
  alternates: { canonical: '/commandes' },
  openGraph: {
    title: 'Votre occasion commence ici · Aux Merveilles de Rantigny',
    description: 'Demande de gâteau d’occasion : la boutique vous rappelle pour en parler.',
    url: '/commandes',
    images: [{ url: media.coeurs.src, width: 1254, height: 1254, alt: media.coeurs.alt }],
  },
};

export default function CommandesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Gâteaux d’occasion', path: '/commandes' }])),
        }}
      />

      <section className="occasion" aria-labelledby="order-title">
        <div className="occasion-media">
          <Photo k="coeurs" sizes="(max-width: 1023px) 100vw, 46vw" priority quality={80} pos="42% 60%" />
          <h1 id="order-title" className="occasion-title">
            <span className="rb rb-dark">Votre occasion</span>
            <span className="rb rb-orange">commence ici.</span>
          </h1>
        </div>

        <div className="occasion-body">
          <p className="occasion-lead">
            Anniversaire, fête de famille, gâteau personnalisé : remplissez la fiche, la boutique vous rappelle
            pour voir ensemble ce qui est réalisable. Vous préférez parler tout de suite ?{' '}
            <a href={site.phone.href}>{site.phone.display}</a>.
          </p>
          <OrderForm />
        </div>
      </section>

      <section className="occasion-how" aria-labelledby="how-title">
        <div className="cadre">
          <h2 id="how-title" className="d d-l">Comment <span className="it">ça se passe</span></h2>
          <Steps tone="light" />
        </div>
      </section>
    </>
  );
}
