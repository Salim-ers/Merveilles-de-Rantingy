'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { media } from '@/data/media';
import { vitrine } from '@/data/gallery';

/**
 * « La vitrine du jour » : mosaïque éditoriale, sans cartes.
 * Sans JavaScript, chaque vignette est un simple lien vers la photo.
 * Avec JavaScript, elle ouvre une visionneuse (<dialog> natif : piège du focus,
 * fermeture par Échap, retour du focus sur la vignette), navigable au clavier et au doigt.
 */
export function PhotoGrid() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    trigger.current = event.currentTarget;
    setIndex(i);
    dialog.current?.showModal();
  };

  const step = useCallback((delta: number) => {
    setIndex((i) => (i === null ? i : (i + delta + vitrine.length) % vitrine.length));
  }, []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      setIndex(null);
      trigger.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    el.addEventListener('close', onClose);
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('close', onClose);
      el.removeEventListener('keydown', onKey);
    };
  }, [step]);

  const current = index === null ? null : vitrine[index];
  const currentMedia = current ? media[current.key] : null;

  return (
    <>
      <ul className="mosaic" data-reveal="stagger">
        {vitrine.map((tile, i) => {
          const m = media[tile.key];
          return (
            <li
              key={tile.key}
              className={`tile tile--${tile.mobile}`}
              style={{ '--i': i % 6, '--col': tile.col, '--row': tile.row } as React.CSSProperties}
            >
              <a href={m.src} onClick={(e) => open(i, e)} aria-label={`${tile.name} — agrandir la photo`}>
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  sizes={tile.mobile === 'wide' ? '(max-width: 700px) 100vw, 50vw' : '(max-width: 700px) 50vw, 34vw'}
                  style={{ objectFit: 'cover', objectPosition: m.pos ?? '50% 50%' }}
                />
                <span className="tile-cap" aria-hidden="true">
                  <b>{tile.name}</b>
                  <span>{tile.category}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        className="lb"
        aria-label={current ? `Photo : ${current.name}` : 'Visionneuse'}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX;
          if (start !== null && end !== undefined && Math.abs(end - start) > 50) step(end < start ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current && currentMedia && (
          <div className="lb-in">
            <div className="lb-img">
              <Image
                key={current.key}
                src={currentMedia.src}
                alt={currentMedia.alt}
                width={currentMedia.width}
                height={currentMedia.height}
                sizes="(max-width: 900px) 100vw, 80vh"
                quality={80}
              />
            </div>
            <p className="lb-cap">
              <b>{current.name}</b> · {current.category}
              <span>{(index ?? 0) + 1} / {vitrine.length}</span>
            </p>
          </div>
        )}
        <button type="button" className="lb-btn lb-x" onClick={() => dialog.current?.close()} aria-label="Fermer la visionneuse">✕</button>
        <button type="button" className="lb-btn lb-prev" onClick={() => step(-1)} aria-label="Photo précédente">←</button>
        <button type="button" className="lb-btn lb-next" onClick={() => step(1)} aria-label="Photo suivante">→</button>
      </dialog>
    </>
  );
}
