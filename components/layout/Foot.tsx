import Link from 'next/link';
import { site, fullAddress } from '@/data/site';

const cols = [
  { title: 'La boutique', links: [
    { label: 'La boutique', href: '/la-boutique' },
    { label: 'Nos produits', href: '/nos-produits' },
    { label: 'Galerie', href: '/nos-produits#galerie' },
  ]},
  { title: 'Infos', links: [
    { label: 'Horaires', href: '/contact#horaires' },
    { label: 'Adresse', href: '/contact' },
    { label: 'Commandes', href: '/commandes' },
    { label: 'Actualités', href: '/actualites' },
  ]},
  { title: 'Légal', links: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Confidentialité', href: '/politique-confidentialite' },
    { label: 'Cookies', href: '/politique-confidentialite#cookies' },
  ]},
];

export function Foot() {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot-grid">
          <div>
            <p className="fmark">Aux Merveilles <em>de Rantigny</em></p>
            <p className="fsay">
              Boulangerie, pâtisserie et sandwicherie, {site.address.street.toLowerCase()}.
              Ouvert de 6h30 à 20h, fermé le jeudi.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>{col.links.map((l) => <li key={l.label}><Link href={l.href}>{l.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="foot-end">
          <p>
            {site.legal.name} — {site.legal.form} au capital de {site.legal.capital}
            <br />SIREN {site.legal.siren} · {site.legal.rcs} · {fullAddress}
          </p>
          <p>
            Logo officiel à intégrer — composition typographique provisoire.
            <br />Numéro de voirie à confirmer auprès de la boutique.
          </p>
        </div>
      </div>
    </footer>
  );
}
