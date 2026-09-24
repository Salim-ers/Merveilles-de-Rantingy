import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead } from '@/components/sections/PageHead';
import { HoursCard } from '@/components/sections/HoursCard';
import { InfoBlock } from '@/components/sections/InfoBlock';
import { ContactForm } from '@/components/forms/ContactForm';
import { media } from '@/data/media';
import { site } from '@/data/site';
import { hoursSummary } from '@/lib/business-status';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Horaires, adresse et téléphone',
  description: `Aux Merveilles de Rantigny, ${site.address.street}, ${site.address.postalCode} ${site.address.city}. ${hoursSummary()}. Téléphone ${site.phone.display}.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Horaires & accès · Aux Merveilles de Rantigny',
    description: `${site.address.street}, ${site.address.city} — ${hoursSummary()}.`,
    url: '/contact',
    images: [{ url: media.facade.src, width: 1254, height: 1254, alt: media.facade.alt }],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Horaires & accès', path: '/contact' }])),
        }}
      />

      <PageHead
        kicker="Horaires & accès"
        title={<>Nous <span className="it">trouver</span></>}
        lead={<>{site.address.street}, {site.address.postalCode} {site.address.city}. Appelez le <a href={site.phone.href}>{site.phone.display}</a>.</>}
        image="facade"
        pos="45% 55%"
      />
      <HoursCard />
      <InfoBlock />

      <section className="write" aria-labelledby="write-title">
        <div className="cadre write-grid">
          <div>
            <h2 id="write-title" className="d d-l">Écrire <span className="it">à la boutique</span></h2>
            <p className="write-lead">
              Une question sur un produit ou une disponibilité ? Écrivez ici. Pour une réponse immédiate,
              le téléphone reste le plus rapide. Pour un gâteau d’occasion, utilisez plutôt{' '}
              <Link href="/commandes">la fiche de demande</Link>.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
