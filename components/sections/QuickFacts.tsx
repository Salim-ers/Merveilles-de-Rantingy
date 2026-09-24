import Link from 'next/link';
import { site } from '@/data/site';

/**
 * Trois repères, tout de suite : quand, où, comment appeler.
 * L'essentiel est lisible sans faire défiler la page.
 */
export function QuickFacts() {
  return (
    <section className="sec sec--tight ivory">
      <div className="shell quick">
        <div className="q rise">
          <span className="k">Horaires</span>
          <span className="v">6h30 – 20h<small>Six jours sur sept, fermé le jeudi</small></span>
          <Link className="more" href="/contact#horaires">Voir la semaine <span>→</span></Link>
        </div>
        <div className="q rise" data-d=".06s">
          <span className="k">Adresse</span>
          <span className="v">{site.address.street}<small>{site.address.postalCode} {site.address.city}, {site.address.department}</small></span>
          <a className="more" href={site.maps.directions} target="_blank" rel="noopener">Itinéraire <span>→</span></a>
        </div>
        <div className="q rise" data-d=".12s">
          <span className="k">Téléphone</span>
          <span className="v">{site.phone.display}<small>Pour une commande ou une question</small></span>
          <a className="more" href={site.phone.href}>Appeler la boutique <span>→</span></a>
        </div>
      </div>
    </section>
  );
}
