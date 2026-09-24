import type { Metadata } from 'next';
import { PageHead } from '@/components/sections/PageHead';
import { HoursCard } from '@/components/sections/HoursCard';
import { InfoBlock } from '@/components/sections/InfoBlock';
import { ContactForm } from '@/components/forms/ContactForm';
import { FinaleCTA } from '@/components/sections/FinaleCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { media } from '@/data/media';
import { site, fullAddress } from '@/data/site';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact & horaires',
  description: 'Aux Merveilles de Rantigny, avenue de Rantigny, 60290 Rantigny. Téléphone 09 80 67 05 88. Ouvert de 6h30 à 20h, fermé le jeudi.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Contact', path: '/contact' }])),
        }}
      />

      <PageHead
        crumb="Contact"
        title={<>Une question ?<br /><em>Passez ou appelez.</em></>}
        lead={`${fullAddress} — ${site.phone.display}`}
        image={media.facade}
      />

      <HoursCard />
      <InfoBlock />

      <section className="sec cream">
        <div className="shell split">
          <div>
            <Eyebrow>Écrire</Eyebrow>
            <h2 className="ti s2 rise" data-d=".05s" style={{ maxWidth: '15ch' }}>
              Pour tout le reste,<br /><em>ce formulaire.</em>
            </h2>
            <p className="lead rise" data-d=".1s" style={{ marginTop: 18 }}>
              Question sur un produit, une disponibilité, une commande : écrivez, la boutique répond.
              Pour une réponse immédiate, le téléphone reste plus rapide.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <FinaleCTA />
    </>
  );
}
