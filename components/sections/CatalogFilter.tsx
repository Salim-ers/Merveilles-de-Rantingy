'use client';

import { useEffect } from 'react';

/**
 * Amélioration progressive du catalogue : sans JavaScript, le ruban fait défiler
 * jusqu'au rayon ; avec, il n'affiche que le rayon choisi (« Tout » pour revenir).
 */
export function CatalogFilter() {
  useEffect(() => {
    const root = document.getElementById('catalogue');
    if (!root) return;
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('.ribbon a[data-cat]'));
    const sections = Array.from(root.querySelectorAll<HTMLElement>('.cat-sec[data-cat]'));
    const status = document.getElementById('catalogue-status');
    const ids = new Set(sections.map((s) => s.dataset.cat));

    const apply = (cat: string, scroll: boolean) => {
      const target = ids.has(cat) ? cat : 'tout';
      for (const s of sections) s.hidden = target !== 'tout' && s.dataset.cat !== target;
      for (const l of links) {
        if (l.dataset.cat === target) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
      }
      root.dataset.filter = target;
      if (status) {
        const label = links.find((l) => l.dataset.cat === target)?.textContent ?? '';
        status.textContent = target === 'tout' ? 'Tous les rayons affichés' : `Rayon affiché : ${label}`;
      }
      if (scroll) {
        const top = root.getBoundingClientRect().top + window.scrollY - 8;
        if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-cat]');
      if (!link) return;
      e.preventDefault();
      const cat = link.dataset.cat ?? 'tout';
      history.replaceState(null, '', cat === 'tout' ? location.pathname : `#${cat}`);
      apply(cat, true);
    };

    const fromHash = () => {
      const cat = decodeURIComponent(location.hash.slice(1));
      apply(cat, ids.has(cat));
    };

    fromHash();
    root.querySelector('.ribbon')?.addEventListener('click', onClick as EventListener);
    window.addEventListener('hashchange', fromHash);
    return () => {
      root.querySelector('.ribbon')?.removeEventListener('click', onClick as EventListener);
      window.removeEventListener('hashchange', fromHash);
      for (const s of sections) s.hidden = false;
    };
  }, []);

  return null;
}
