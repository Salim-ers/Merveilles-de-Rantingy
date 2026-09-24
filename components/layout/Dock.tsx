'use client';

import { useEffect, useState } from 'react';
import { Phone, MapPin } from 'lucide-react';
import { site } from '@/data/site';

/** Barre mobile en pastille, posée au-dessus du contenu sans le masquer. */
export function Dock() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const foot = document.querySelector('footer.foot');
      const near = foot ? foot.getBoundingClientRect().top < window.innerHeight - 30 : false;
      setOn(window.scrollY > 480 && !near);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`dock${on ? ' on' : ''}`} aria-label="Actions rapides">
      <a className="m" href={site.phone.href}><Phone size={15} strokeWidth={2} aria-hidden="true" />Appeler</a>
      <a className="s" href={site.maps.directions} target="_blank" rel="noopener">
        <MapPin size={15} strokeWidth={2} aria-hidden="true" />Itinéraire
      </a>
    </div>
  );
}
