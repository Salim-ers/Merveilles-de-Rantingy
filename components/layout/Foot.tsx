import Link from 'next/link';
import { site, fullAddress } from '@/data/site';
import { nav } from '@/data/navigation';
import { hoursSummary } from '@/lib/business-status';

/**
 * Pied de page « devanture » : le store orange (avec sa bordure festonnée)
 * porte le numéro de la boutique ; le bandeau noir dessous, l'adresse et les horaires.
 */
export function Foot() {
  return (
    <footer className="foot">
      <div className="store">
        <div className="cadre store-in">
          <p className="store-say">
            Une commande, une question&nbsp;?<span className="it"> Appelez la boutique.</span>
          </p>
          <a className="store-tel" href={site.phone.href}>{site.phone.display}</a>
        </div>
      </div>

      <div className="cadre foot-body">
        <Link className="mark mark--foot" href="/" aria-label={`${site.name} — accueil`}>
          <span className="mark-a">Aux Merveilles</span>
          <span className="mark-b">de Rantigny</span>
        </Link>

        <div className="foot-col">
          <h2 className="foot-h">Venir</h2>
          <p>{site.address.street}<br />{site.address.postalCode} {site.address.city}, {site.address.department}</p>
          <a className="foot-link" href={site.maps.directions} target="_blank" rel="noopener noreferrer">Itinéraire →</a>
        </div>

        <div className="foot-col">
          <h2 className="foot-h">Ouvert</h2>
          <p>{hoursSummary()}</p>
          <Link className="foot-link" href="/contact#horaires">Tous les horaires →</Link>
        </div>

        <nav className="foot-nav" aria-label="Plan du site">
          <Link href="/">Accueil</Link>
          {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
      </div>

      <div className="cadre foot-end">
        <p>{site.legal.name} · {site.legal.form} · SIREN {site.legal.siren} · {fullAddress}</p>
        <p>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/politique-confidentialite">Confidentialité</Link>
        </p>
      </div>
    </footer>
  );
}
