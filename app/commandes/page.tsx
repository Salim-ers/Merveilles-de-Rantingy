import type { Metadata } from 'next';
import { PageHead } from '@/components/sections/PageHead';
import { OrderForm } from '@/components/forms/OrderForm';
import { FinaleCTA } from '@/components/sections/FinaleCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { media } from '@/data/media';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Commandes & événements',
  description: 'Gâteaux d’anniversaire, pièces de fête, demandes particulières : envoyez votre demande à Aux Merveilles de Rantigny, la boutique confirme par téléphone.',
  alternates: { canonical: '/commandes' },
};

const steps = [
  { t: 'Vous décrivez', p: 'Occasion, nombre de personnes, date souhaitée.' },
  { t: 'On vous rappelle', p: 'Faisabilité, format et tarif, de vive voix.' },
  { t: 'Vous passez le chercher', p: 'À la boutique, le jour convenu.' },
];

export default function CommandesPage() {
  return (
    <>
      <PageHead
        crumb="Commandes"
        title={<>Un gâteau<br /><em>à préparer ?</em></>}
        lead="Dites-nous ce que vous voulez et pour quand. La boutique vous rappelle pour confirmer le format, le délai et le prix."
        image={media.coeurs}
      />

      <section className="sec cocoa on-cocoa">
        <div className="shell split">
          <div>
            <Eyebrow>Comment ça se passe</Eyebrow>
            <h2 className="ti s2 rise" data-d=".05s" style={{ maxWidth: '14ch' }}>
              Trois étapes,<br /><em>pas une de plus.</em>
            </h2>
            <div className="steps rise" data-d=".1s">
              {steps.map((step, i) => (
                <div className="step" key={step.t}>
                  <span className="n">{i + 1}</span>
                  <div><h3>{step.t}</h3><p>{step.p}</p></div>
                </div>
              ))}
            </div>
            <p className="rise" data-d=".15s" style={{ marginTop: 26 }}>
              <a className="p p--cream" href={site.phone.href}>Ou appelez : {site.phone.display}</a>
            </p>
          </div>

          <OrderForm />
        </div>
      </section>

      <FinaleCTA />
    </>
  );
}
