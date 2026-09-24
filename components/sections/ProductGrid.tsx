import Link from 'next/link';
import { categories, productsBy } from '@/data/products';
import { Photo } from '@/components/ui/Photo';
import { Arrow } from '@/components/ui/Arrow';
import { CatalogFilter } from './CatalogFilter';

/**
 * Le catalogue complet, rendu côté serveur : visible sans JavaScript.
 * Le ruban des rayons est une suite d'ancres ; CatalogFilter le transforme en filtre.
 * Aucun prix, aucun panier : c'est une vitrine, pas une boutique en ligne.
 */
export function ProductGrid() {
  return (
    <div className="cat" id="catalogue">
      <nav className="ribbon" aria-label="Rayons de la vitrine">
        <ul>
          <li><a href="#catalogue" data-cat="tout" aria-current="true">Tout</a></li>
          {categories.map((c) => (
            <li key={c.id}><a href={`#${c.id}`} data-cat={c.id}>{c.label}</a></li>
          ))}
        </ul>
      </nav>
      <p className="sr" aria-live="polite" id="catalogue-status" />

      {categories.map((c) => {
        const items = productsBy(c.id);
        if (!items.length) return null;
        return (
          <section className="cat-sec" id={c.id} data-cat={c.id} key={c.id} aria-labelledby={`h-${c.id}`}>
            <header className="cat-head cadre">
              <h2 id={`h-${c.id}`} className="d d-l">{c.label}</h2>
              <p className="it">{c.line}</p>
            </header>
            <div className="cat-items cadre">
              {items.map((p) =>
                p.image ? (
                  <article className="prod" key={p.id}>
                    <Photo k={p.image} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 34vw" />
                    <div className="prod-body">
                      <p className="prod-cat">{c.label}</p>
                      <h3 className="prod-name">{p.name}</h3>
                      {p.text && <p className="prod-text">{p.text}</p>}
                      {p.onRequest && <Link className="ln" href="/commandes">Faire une demande<Arrow /></Link>}
                    </div>
                  </article>
                ) : (
                  <article className="prod prod--type" key={p.id}>
                    <p className="prod-cat">{c.label}</p>
                    <h3 className="prod-name">{p.name}</h3>
                    {p.text && <p className="prod-text">{p.text}</p>}
                    {p.onRequest && <Link className="ln" href="/commandes">Faire une demande<Arrow /></Link>}
                  </article>
                ),
              )}
            </div>
          </section>
        );
      })}

      <CatalogFilter />
    </div>
  );
}
