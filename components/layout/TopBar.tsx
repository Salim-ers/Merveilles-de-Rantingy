import Link from 'next/link';
import { site } from '@/data/site';
import { hoursSummary } from '@/lib/business-status';
import { OpenState } from '@/components/ui/OpenState';
import { NavLinks } from './NavLinks';

/**
 * Le bandeau noir de la devanture, avec son filet orange.
 * Desktop : collé en haut. Mobile : simple enseigne, la navigation passe par le dock du bas.
 */
export function TopBar() {
  return (
    <header className="mast">
      <div className="mast-in">
        <Link className="mark" href="/" aria-label={`${site.name} — accueil`}>
          <span className="mark-a">Aux Merveilles</span>
          <span className="mark-b">de Rantigny</span>
        </Link>

        <nav className="mast-links" aria-label="Navigation principale">
          <NavLinks variant="bar" />
        </nav>

        <div className="mast-side">
          <OpenState fallback={hoursSummary()} />
          <a className="mast-tel" href={site.phone.href}>{site.phone.display}</a>
        </div>
      </div>
    </header>
  );
}
