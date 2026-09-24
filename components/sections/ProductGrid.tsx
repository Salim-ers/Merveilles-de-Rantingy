'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { produits, rayonFilters, type Rayonnage } from '@/data/products';
import { media } from '@/data/media';

/** Catalogue en cartes arrondies : aucun prix, aucun panier. */
export function ProductGrid() {
  const params = useSearchParams();
  const [active, setActive] = useState<Rayonnage | 'tout'>('tout');

  useEffect(() => {
    const r = params.get('r') as Rayonnage | null;
    if (r && rayonFilters.some((f) => f.id === r)) setActive(r);
  }, [params]);

  const items = produits.filter((p) => active === 'tout' || p.rayon === active);

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrer les produits">
        {rayonFilters.map((f) => (
          <button key={f.id} aria-pressed={active === f.id} onClick={() => setActive(f.id)}>{f.label}</button>
        ))}
      </div>

      <div className="cards">
        {items.map((produit, i) => {
          const img = media[produit.image];
          return (
            <article className="card rise" data-d={`${(i % 3) * 0.06}s`} key={produit.id}>
              <div className="ph">
                <Image src={img.src} alt={img.alt} width={900} height={675} sizes="(max-width:1080px) 100vw, 32vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="bd">
                <h3>{produit.name}</h3>
                <p>{produit.text}</p>
                <span className={`badge${produit.how === 'commande' ? ' badge--order' : ''}`}>
                  {produit.how === 'commande' ? 'Sur commande' : 'En boutique'}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <p className="note" style={{ marginTop: 28, borderRadius: 'var(--r-s)' }}>
        Les disponibilités changent d’un jour à l’autre. Pour une pièce précise ou une commande,
        <Link href="/commandes" className="link" style={{ marginLeft: 4 }}>passez par le formulaire</Link> ou appelez la boutique.
      </p>
    </>
  );
}
