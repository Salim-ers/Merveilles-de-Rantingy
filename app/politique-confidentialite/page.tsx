import type { Metadata } from 'next';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Données personnelles et cookies sur le site Aux Merveilles de Rantigny.',
  alternates: { canonical: '/politique-confidentialite' },
  robots: { index: false, follow: true },
};

const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

export default function PrivacyPage() {
  return (
    <article className="mentions cadre">
      <h1 className="d d-l">Confidentialité</h1>
      <p className="mentions-lead">Le site de {site.name} collecte le strict nécessaire pour répondre à vos demandes, et rien d’autre.</p>

      <h2 className="d d-m">Données collectées</h2>
      <p>
        La fiche de demande de gâteau recueille vos prénom, nom, téléphone, e-mail (facultatif), la date souhaitée,
        le nombre de personnes, l’occasion et votre message. Le formulaire de contact recueille vos prénom, nom,
        e-mail, téléphone (facultatif) et votre message.
      </p>

      <h2 className="d d-m">Utilisation</h2>
      <p>
        Ces informations sont transmises par e-mail à la boutique, uniquement pour vous rappeler ou vous répondre au
        sujet de votre demande. Elles ne sont ni revendues, ni cédées, ni utilisées à des fins publicitaires. Le site
        ne les enregistre pas dans une base de données ; elles sont conservées par la boutique le temps nécessaire au
        traitement de votre demande.
      </p>

      <h2 className="d d-m">Prestataires</h2>
      <p>
        Le site est hébergé par {site.legal.host.name}. Les e-mails sont acheminés par un service d’envoi
        transactionnel.{turnstile ? ' Une vérification anti-spam Cloudflare Turnstile est utilisée sur les formulaires.' : ''}
      </p>

      <h2 className="d d-m" id="cookies">Cookies</h2>
      <p>
        Ce site ne dépose aucun cookie de mesure d’audience, de publicité ou de réseau social. Aucune carte ni vidéo
        tierce n’est chargée. C’est pourquoi aucun bandeau de consentement n’est affiché. Si un tel outil était ajouté,
        votre consentement serait demandé avant tout dépôt.
      </p>

      <h2 className="d d-m">Vos droits</h2>
      <p>
        Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données en
        contactant la boutique au <a href={site.phone.href}>{site.phone.display}</a>. Vous pouvez aussi adresser une
        réclamation à la CNIL (cnil.fr).
      </p>
    </article>
  );
}
