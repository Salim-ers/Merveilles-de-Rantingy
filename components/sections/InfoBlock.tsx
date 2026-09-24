import { site, fullAddress } from '@/data/site';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Arrow } from '@/components/ui/Arrow';

export function InfoBlock({ withMap = true }: { withMap?: boolean }) {
  return (
    <section className="sec paper" id="venir">
      <div className="shell split">
        <div>
          <Eyebrow>Venir nous voir</Eyebrow>
          <h2 className="ti s2 rise" data-d=".05s" style={{ maxWidth: '13ch' }}>
            {site.address.street},<br /><em>dans l’Oise.</em>
          </h2>

          <ul className="facts rise" data-d=".1s">
            <li>
              <span className="k">Adresse</span>
              <span className="v">{site.address.street}<small>{site.address.postalCode} {site.address.city}, {site.address.department}</small></span>
            </li>
            <li>
              <span className="k">Téléphone</span>
              <span className="v"><a href={site.phone.href}>{site.phone.display}</a></span>
            </li>
            <li>
              <span className="k">Horaires</span>
              <span className="v">6h30 – 20h<small>Fermé le jeudi</small></span>
            </li>
            <li>
              <span className="k">Sur place</span>
              <span className="v">Vente à emporter<small>{site.activities.slice(0, 4).join(', ')}</small></span>
            </li>
          </ul>

          <div className="acts">
            <a className="p p--main" href={site.maps.directions} target="_blank" rel="noopener">Itinéraire<Arrow /></a>
            <a className="p p--line" href={site.phone.href}>Appeler</a>
          </div>
        </div>

        {withMap && (
          <div className="map grow">
            <iframe
              src={site.maps.embed}
              title={`Plan d’accès — ${site.name}, ${fullAddress}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
