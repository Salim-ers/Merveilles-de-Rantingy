import Link from 'next/link';
import { site } from '@/data/site';
import { hoursSummary } from '@/lib/business-status';
import { Photo } from '@/components/ui/Photo';
import { Arrow } from '@/components/ui/Arrow';

/**
 * « Poussez la porte » : la boutique elle-même, uniquement en photographies réelles.
 * Le filet orange de la façade traverse la section.
 */
export function ShopBand({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="door" aria-labelledby="door-title">
      <span className="door-line" aria-hidden="true" />
      <div className="cadre door-grid">
        <div className="door-inside" data-reveal="mask">
          <Photo k="interieur" sizes="(max-width: 900px) 100vw, 62vw" pos="50% 58%" />
        </div>
        <div className="door-facade" data-reveal="mask">
          <Photo k="facade" sizes="(max-width: 900px) 60vw, 28vw" pos="30% 55%" />
        </div>
        <div className="door-text">
          <p className="kicker">{site.address.street} · depuis {site.legal.since}</p>
          <h2 id="door-title" className="d d-xl" data-reveal="rise">Poussez <span className="it">la porte</span></h2>
          <p className="door-lead" data-reveal="rise">
            Derrière la devanture noire et ses stores orange : les comptoirs vitrés de pâtisseries, les pains en
            corbeilles, les sandwichs et les boissons fraîches. {hoursSummary()}.
          </p>
          <div className="door-acts">
            <a className="cta cta--ink" href={site.maps.directions} target="_blank" rel="noopener noreferrer">Itinéraire<Arrow /></a>
            {withLink && <Link className="ln" href="/la-boutique">La boutique<Arrow /></Link>}
          </div>
        </div>
        <div className="door-crumbs" aria-hidden="true">
          <Photo k="painCampagne" sizes="(max-width: 900px) 30vw, 14vw" decorative />
          <Photo k="macarons" sizes="(max-width: 900px) 30vw, 14vw" pos="40% 60%" decorative />
        </div>
      </div>
    </section>
  );
}
