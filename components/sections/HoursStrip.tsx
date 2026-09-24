import { site } from '@/data/site';

/** Bandeau d'information : fixe, lisible, sans défilement automatique. */
export function HoursStrip() {
  return (
    <div className="strip">
      <div className="shell strip-in">
        <b>Ouvert de 6h30 à 20h</b>
        <span className="dot" aria-hidden="true" />
        <span>Fermé le jeudi</span>
        <span className="dot" aria-hidden="true" />
        <span>{site.address.street}, {site.address.postalCode}</span>
      </div>
    </div>
  );
}
