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
    <section className="sec ivory" style={{ paddingTop: 'calc(var(--bar) + var(--pad))' }}>
      <div className="shell" style={{ maxWidth: 860 }}>
        <h1 className="ti s2">Mentions légales</h1>

        <ul className="facts" style={{ marginTop: 34 }}>
          <li><span className="k">Éditeur</span><span className="v">{site.legal.name}<small>{site.legal.form} au capital de {site.legal.capital} — {fullAddress}</small></span></li>
          <li><span className="k">Immatriculation</span><span className="v">SIREN {site.legal.siren}<small>SIRET {site.legal.siret} · {site.legal.rcs} · TVA {site.legal.vat}</small></span></li>
          <li><span className="k">Activité</span><span className="v">{site.legal.activity}<small>Entreprise immatriculée depuis {site.legal.since}</small></span></li>
          <li><span className="k">Téléphone</span><span className="v">{site.phone.display}</span></li>
          <li><span className="k">Publication</span><span className="v">{site.legal.director ?? '[À compléter]'}<small>Le gérant figure au registre du commerce : à confirmer avant publication.</small></span></li>
          <li><span className="k">Hébergement</span><span className="v">{site.legal.host.name}<small>{site.legal.host.address}</small></span></li>
        </ul>

        <div className="steps" style={{ marginTop: 34 }}>
          <div className="step">
            <span className="n">1</span>
            <div>
              <h3>Propriété intellectuelle</h3>
              <p>Les photographies présentées sur ce site ont été fournies par {site.legal.name} et sont protégées. Toute reproduction sans autorisation est interdite.</p>
            </div>
          </div>
          <div className="step">
            <span className="n">2</span>
            <div>
              <h3>Crédits</h3>
              <p>Conception et développement : [agence à compléter]. Photographies : {site.legal.name}.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
