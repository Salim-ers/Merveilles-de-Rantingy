import Link from 'next/link';
import { Photo } from '@/components/ui/Photo';
import { Arrow } from '@/components/ui/Arrow';
import type { MediaKey } from '@/data/media';

type Merveille = {
  n: string;
  name: string;
  text: string;
  image: MediaKey;
  pos?: string;
  layout: 'bleed' | 'vertical' | 'offset' | 'vertical-right';
  href: string;
};

const merveilles: Merveille[] = [
  {
    n: '01', name: 'Macarons géants', image: 'macarons', layout: 'bleed', pos: '50% 58%',
    text: 'Deux coques roses, de la crème, des fraises entières et un voile de sucre glace. Format XXL.',
    href: '/nos-produits#patisseries',
  },
  {
    n: '02', name: 'Entremets', image: 'entremetsIndiv', layout: 'vertical', pos: '62% 50%',
    text: 'Glaçage miroir jaune éclatant, fraises, framboises et myrtilles posées à la main. En individuel ou à partager.',
    href: '/nos-produits#patisseries',
  },
  {
    n: '03', name: 'Flans pâtissiers', image: 'flans', layout: 'offset', pos: '50% 0%',
    text: 'Hauts, dorés, la surface caramélisée en taches brunes. À la part ou en pièce entière.',
    href: '/nos-produits#flans-tartes',
  },
  {
    n: '04', name: 'Tartes', image: 'tartePommes', layout: 'vertical-right', pos: '50% 48%',
    text: 'La grande tarte aux pommes, pâte dorée, à partager sur la table du dimanche.',
    href: '/nos-produits#flans-tartes',
  },
];

/** « Les merveilles » : chaque pièce signature a sa propre mise en page, jamais une grille. */
export function TroisMerveilles() {
  return (
    <section className="mv" aria-labelledby="mv-title">
      <header className="mv-head cadre">
        <p className="kicker">La vitrine · pièces signature</p>
        <h2 id="mv-title" className="d d-xl" data-reveal="rise">
          Les merveilles<em className="it"> de la vitrine</em>
        </h2>
      </header>

      {merveilles.map((m) => (
        <article className={`mv-item mv--${m.layout}`} key={m.n}>
          <div className="mv-media px" data-reveal="mask">
            <Photo
              k={m.image}
              pos={m.pos}
              sizes={m.layout === 'bleed' ? '100vw' : '(max-width: 900px) 100vw, 66vw'}
            />
          </div>
          <h3 className="mv-name" data-reveal="rise"><span>{m.name}</span></h3>
          <div className="mv-text" data-reveal="rise">
            <span className="mv-n">{m.n}</span>
            <p>{m.text}</p>
            <Link className="ln" href={m.href}>Dans la vitrine<Arrow /></Link>
          </div>
        </article>
      ))}
    </section>
  );
}
