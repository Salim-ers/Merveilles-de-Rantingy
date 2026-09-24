import type { Metadata } from 'next';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Données personnelles et cookies sur le site Aux Merveilles de Rantigny.',
  alternates: { canonical: '/politique-confidentialite' },
  robots: { index: false, follow: true },
};

const blocks = [
  { id: undefined, t: 'Données collectées', p: 'Les formulaires de contact et de commande collectent uniquement ce qui permet de traiter la demande : nom, prénom, téléphone, e-mail, date souhaitée et contenu du message.' },
  { id: undefined, t: 'Finalité et conservation', p: 'Ces informations servent exclusivement à répondre à la demande. Elles ne sont ni revendues ni transmises à des tiers à des fins commerciales, et sont conservées le temps du traitement.' },
  { id: undefined, t: 'Vos droits', p: 'Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données en appelant la boutique.' },
  { id: 'cookies', t: 'Cookies', p: 'Ce site ne dépose aucun cookie de mesure d’audience ni de publicité : aucune bannière de consentement n’est donc affichée. Si un outil de statistiques était ajouté, un bandeau conforme serait mis en place au préalable.' },
  { id: undefined, t: 'Services tiers', p: 'La carte d’accès est fournie par Google Maps et n’est chargée qu’au moment où la section s’affiche. Son affichage peut entraîner un dépôt de cookies par Google.' },
];

export default function PrivacyPage() {
  return (
    <section className="sec ivory" style={{ paddingTop: 'calc(var(--bar) + var(--pad))' }}>
      <div className="shell" style={{ maxWidth: 860 }}>
        <h1 className="ti s2">Confidentialité</h1>
        <p className="lead" style={{ marginTop: 18 }}>
          Le site de {site.name} collecte le strict nécessaire, et rien d’autre.
        </p>

        <div className="steps" style={{ marginTop: 34 }}>
          {blocks.map((block, i) => (
            <div className="step" id={block.id} key={block.t}>
              <span className="n">{i + 1}</span>
              <div><h3>{block.t}</h3><p>{block.p}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
