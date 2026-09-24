import type { Metadata } from 'next';
import { site, fullAddress } from '@/data/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Aux Merveilles de Rantigny, boulangerie-pâtisserie à Rantigny (60290).',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: false, follow: true },
};

export default function MentionsPage() {
  return (
    <article className="mentions cadre">
      <h1 className="d d-l">Mentions légales</h1>

      <dl className="mentions-list">
        <div><dt>Éditeur</dt><dd>{site.legal.name}, {site.legal.form} au capital de {site.legal.capital}<br />{fullAddress}</dd></div>
        <div><dt>Immatriculation</dt><dd>SIREN {site.legal.siren} · SIRET {site.legal.siret}<br />{site.legal.rcs} · TVA {site.legal.vat}</dd></div>
        <div><dt>Activité</dt><dd>{site.legal.activity}</dd></div>
        <div><dt>Téléphone</dt><dd><a href={site.phone.href}>{site.phone.display}</a></dd></div>
        <div>
          <dt>Directeur de la publication</dt>
          <dd>{site.legal.director ?? `Le gérant de la société ${site.legal.name}`}</dd>
        </div>
        <div><dt>Hébergement</dt><dd>{site.legal.host.name}<br />{site.legal.host.address}</dd></div>
      </dl>

      <h2 className="d d-m">Propriété intellectuelle</h2>
      <p>
        Les photographies présentées sur ce site appartiennent à {site.legal.name}. Toute reproduction sans
        autorisation préalable est interdite.
      </p>

      <h2 className="d d-m">Informations produits</h2>
      <p>
        Les produits présentés illustrent ce que propose habituellement la boutique. Leur disponibilité varie selon
        les jours ; aucun prix n’est affiché en ligne et aucune vente n’est conclue sur ce site.
      </p>
    </article>
  );
}
