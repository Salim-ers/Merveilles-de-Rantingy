'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '@/data/navigation';
import { Photo } from '@/components/ui/Photo';

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/**
 * Liens de navigation.
 * - "bar"  : bandeau desktop, texte seul.
 * - "menu" : la carte mobile, une vitrine de vignettes photo étiquetées.
 */
export function NavLinks({ variant }: { variant: 'bar' | 'menu' }) {
  const pathname = usePathname() ?? '/';

  const close = () => {
    try {
      document.getElementById('carte')?.hidePopover();
    } catch {
      /* popover déjà fermé ou API absente */
    }
  };

  if (variant === 'bar') {
    return (
      <ul className="mast-nav">
        {nav.map((item) => (
          <li key={item.href}>
            <Link href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="carte-grid">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={close}
              className={item.image ? 'carte-tile' : 'carte-tile carte-tile--type'}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.image && <Photo k={item.image} pos={item.pos} sizes="50vw" decorative />}
              <span className="carte-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link className="carte-home" href="/" onClick={close} aria-current={pathname === '/' ? 'page' : undefined}>
        Retour à l’accueil
      </Link>
    </>
  );
}
