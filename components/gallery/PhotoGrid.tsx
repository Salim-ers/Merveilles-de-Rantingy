'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery, galleryFilters, type Filtre } from '@/data/gallery';
import { media } from '@/data/media';

/** Galerie en arches + visionneuse accessible (clavier, swipe, Échap). */
export function PhotoGrid() {
  const [filter, setFilter] = useState<Filtre>('tout');
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef(0);

  const items = useMemo(() => gallery.filter((g) => filter === 'tout' || g.filter === filter), [filter]);
  const move = useCallback((delta: number) => {
    setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'ArrowLeft') move(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [index, move]);

  const current = index !== null ? items[index] : undefined;
  const img = current ? media[current.key] : undefined;

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrer la galerie">
        {galleryFilters.map((f) => (
          <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
        ))}
      </div>

      <div className="arches">
        {items.map((item, i) => {
          const photo = media[item.key];
          return (
            <button key={item.key} onClick={() => setIndex(i)} aria-label={`Agrandir : ${photo.alt}`}>
              <figure className="arch" style={{ margin: 0 }}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width:760px) 100vw, 32vw" style={{ objectFit: 'cover' }} />
              </figure>
            </button>
          );
        })}
      </div>

      <div
        className={`viewer${current ? ' open' : ''}`}
        aria-hidden={!current}
        role="dialog"
        aria-modal="true"
        aria-label="Galerie photo"
        onClick={(e) => { if (e.target === e.currentTarget) setIndex(null); }}
        onTouchStart={(e) => { touch.current = e.touches[0]!.clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0]!.clientX - touch.current;
          if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
        }}
      >
        <button ref={closeRef} className="x" aria-label="Fermer" onClick={() => setIndex(null)}><X size={18} /></button>
        <button className="pv" aria-label="Image précédente" onClick={() => move(-1)}><ChevronLeft size={18} /></button>
        <button className="nx" aria-label="Image suivante" onClick={() => move(1)}><ChevronRight size={18} /></button>
        {img && (
          <div>
            <Image src={img.src} alt={img.alt} width={1400} height={Math.round(1400 / img.ratio)} sizes="92vw" quality={88} />
            <p className="cap">{img.alt}</p>
          </div>
        )}
      </div>
    </>
  );
}
