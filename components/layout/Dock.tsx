import { site, fullAddress } from '@/data/site';
import { hoursSummary } from '@/lib/business-status';
import { OpenState } from '@/components/ui/OpenState';
import { NavLinks } from './NavLinks';

/**
 * Mobile : une étiquette flottante en bas d'écran (Appeler · Itinéraire · La carte)
 * et « la carte », un volet qui remonte avec les rayons en vignettes photo.
 * Le volet utilise l'API Popover native : ouverture, fermeture (Échap, toucher
 * à l'extérieur) et accessibilité sans JavaScript applicatif.
 */
export function Dock() {
  return (
    <>
      <nav className="dock" aria-label="Actions rapides">
        <a className="dock-call" href={site.phone.href}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6.6 2.5 8.4 6 6.9 7.6a10.6 10.6 0 0 0 5.5 5.5L14 11.6l3.5 1.8-.6 3.1c-.2.8-.9 1.2-1.7 1.1C8.6 16.9 3.1 11.4 2.4 4.8c-.1-.8.4-1.5 1.1-1.7z" /></svg>
          Appeler
        </a>
        <a className="dock-go" href={site.maps.directions} target="_blank" rel="noopener noreferrer">
          Itinéraire
        </a>
        <button type="button" className="dock-menu" popoverTarget="carte" aria-haspopup="dialog">
          La carte
        </button>
      </nav>

      <div id="carte" className="carte" popover="auto" role="dialog" aria-modal="true" aria-label="La carte du site">
        <div className="carte-top">
          <p className="carte-k">La carte</p>
          <button type="button" className="carte-x" popoverTarget="carte" popoverTargetAction="hide" aria-label="Fermer la carte">
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <NavLinks variant="menu" />
        <div className="carte-foot">
          <a className="carte-tel" href={site.phone.href}>{site.phone.display}</a>
          <OpenState fallback={hoursSummary()} />
          <p>{fullAddress}</p>
        </div>
      </div>
    </>
  );
}
