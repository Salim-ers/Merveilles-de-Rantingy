'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Révélations au défilement, sans bibliothèque.
 * Le contenu est visible par défaut : ce n'est qu'une fois ce script actif
 * (html[data-motion="on"]) que les éléments hors écran sont masqués puis dévoilés.
 * Rien ne se passe si l'utilisateur préfère réduire les animations.
 *
 * data-reveal="mask"  : la photo se découvre sous un volet
 * data-reveal="rise"  : le texte monte légèrement
 * data-reveal="stagger" : les enfants arrivent l'un après l'autre (--i)
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    const vh = window.innerHeight;

    // Ce qui est déjà à l'écran reste affiché tel quel (pas de clignotement).
    for (const el of nodes) {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('is-in');
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    nodes.filter((el) => !el.classList.contains('is-in')).forEach((el) => io.observe(el));
    root.dataset.motion = 'on';

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
