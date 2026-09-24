'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { nav, site, fullAddress } from '@/data/site';
import { OpenState } from '@/components/ui/OpenState';

/** Barre flottante en pastille, posée sur l'ivoire. */
export function TopBar() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`top${stuck ? ' stuck' : ''}`}>
        <div className="shell">
          <div className="top-in">
            <Link className="logo" href="/" aria-label={`${site.name}, accueil`}>
              {/* Logo officiel à intégrer — composition typographique provisoire. */}
              <b>Aux Merveilles <em>de Rantigny</em></b>
              <span>Boulangerie · Pâtisserie</span>
            </Link>

            <nav className="nav" aria-label="Navigation principale">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="top-act">
              <a className="tel" href={site.phone.href}>{site.phone.display}</a>
              <Link className="p p--main" href="/contact">Nous trouver</Link>
              <button
                className="burger"
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={open}
                aria-controls="panel"
                onClick={() => setOpen((v) => !v)}
              >
                <i /><i />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`panel${open ? ' open' : ''}`} id="panel" aria-hidden={!open}>
        <button className="x" aria-label="Fermer le menu" onClick={() => setOpen(false)}><X size={18} /></button>
        <nav aria-label="Navigation mobile">
          {nav.map((item, i) => (
            <Link key={item.href} href={item.href} ref={i === 0 ? first : undefined} tabIndex={open ? 0 : -1}>
              {item.label}<b>{String(i + 1).padStart(2, '0')}</b>
            </Link>
          ))}
        </nav>
        <div className="panel-foot">
          <OpenState />
          <a className="p p--dark" href={site.phone.href}>{site.phone.display}</a>
          <span style={{ color: 'var(--text-soft)', fontSize: '.95rem' }}>{fullAddress}</span>
        </div>
      </div>
    </>
  );
}
