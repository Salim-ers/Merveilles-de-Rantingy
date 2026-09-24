import { site } from '@/data/site';
import { Arrow } from '@/components/ui/Arrow';

/** Venir à la boutique : adresse, téléphone, itinéraire. Aucune carte tierce chargée. */
export function InfoBlock() {
  return (
    <section className="come" aria-labelledby="come-title">
      <div className="cadre come-grid">
        <h2 id="come-title" className="d d-l">Venir <span className="it">nous voir</span></h2>
        <dl className="come-list">
          <div>
            <dt>Adresse</dt>
            <dd>{site.address.street}<small>{site.address.postalCode} {site.address.city} · {site.address.department}</small></dd>
          </div>
          <div>
            <dt>Téléphone</dt>
            <dd><a href={site.phone.href}>{site.phone.display}</a></dd>
          </div>
          <div>
            <dt>Sur place</dt>
            <dd>Vente à emporter<small>Boulangerie · pâtisserie · sandwicherie</small></dd>
          </div>
        </dl>
        <div className="come-acts">
          <a className="cta cta--orange" href={site.maps.directions} target="_blank" rel="noopener noreferrer">
            Itinéraire<Arrow />
          </a>
          <a className="cta cta--line-ink" href={site.phone.href}>Appeler la boutique</a>
        </div>
      </div>
    </section>
  );
}
