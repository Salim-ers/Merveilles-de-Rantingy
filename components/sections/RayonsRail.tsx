import Link from 'next/link';
import { categories } from '@/data/products';
import { Photo } from '@/components/ui/Photo';

/**
 * La signalétique des rayons, comme les titres d'une carte.
 * Desktop : survol ou focus d'un rayon → sa photo s'affiche à droite (CSS :has, sans JS).
 * Mobile : chaque ligne porte sa vignette, rien ne dépend du survol.
 */
export function RayonsRail() {
  return (
    <section className="board" aria-labelledby="board-title">
      <div className="cadre board-in">
        <div className="board-head">
          <p className="kicker">Rayon par rayon</p>
          <h2 id="board-title" className="d d-l" data-reveal="rise">Qu’est-ce qui <em className="it">vous fait envie ?</em></h2>
        </div>

        <ol className="board-list" data-reveal="stagger">
          {categories.map((c, i) => (
            <li key={c.id} style={{ '--i': i } as React.CSSProperties}>
              <Link href={`/nos-produits#${c.id}`}>
                <span className="board-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="board-name">{c.label}</span>
                <span className="board-line">{c.line}</span>
                <span className="board-thumb" aria-hidden="true">
                  {c.image ? (
                    <Photo k={c.image} pos={c.pos} sizes="96px" decorative />
                  ) : (
                    <span className="board-empty">{c.label.slice(0, 1)}</span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="board-stage" aria-hidden="true">
          {categories.map((c) =>
            c.image ? (
              <Photo key={c.id} k={c.image} pos={c.pos} className="board-pic" sizes="36vw" decorative />
            ) : (
              <div key={c.id} className="board-pic board-pic--type">
                <span>{c.label}</span>
                <em className="it">{c.line}</em>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
