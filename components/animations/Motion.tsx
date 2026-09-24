'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Mouvement doux : des choses qui montent et qui s'ouvrent, jamais qui claquent.
 * - Révélations : IntersectionObserver, 0,7–1 s, courbe souple.
 * - GSAP, chargé dynamiquement, ne sert qu'à faire respirer le hero
 *   (léger dézoom de l'arche et flottement des deux médaillons).
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -7% 0px' },
    );
    document.querySelectorAll<HTMLElement>('.rise,.grow,.curtain').forEach((el) => {
      if (el.dataset.d) el.style.setProperty('--d', el.dataset.d);
      io.observe(el);
    });

    if (reduce) return () => io.disconnect();

    let dispose: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (document.querySelector('.hero-arch img')) {
          gsap.to('.hero-arch img', { scale: 1, duration: 1.8, ease: 'power2.out', delay: 0.2 });
        }
        gsap.utils.toArray<HTMLElement>('.hero-float .round').forEach((el, i) => {
          gsap.to(el, {
            y: i === 0 ? -34 : 34, ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 },
          });
        });
        gsap.utils.toArray<HTMLElement>('[data-float]').forEach((el) => {
          gsap.fromTo(el, { y: 16 }, {
            y: -16, ease: 'none',
            scrollTrigger: { trigger: el.parentElement!, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          });
        });
      });

      ScrollTrigger.refresh();
      dispose = () => ctx.revert();
    })();

    return () => { io.disconnect(); dispose?.(); };
  }, [pathname]);

  return null;
}
