import Image from 'next/image';
import Link from 'next/link';
import { media, type MediaKey } from '@/data/media';
import { OpenState } from '@/components/ui/OpenState';
import { Arrow } from '@/components/ui/Arrow';

/**
 * Hero : trois arches alignées comme une devanture, posées sur un appui de vitrine.
 * Le nom reste en typographie, au-dessus : les photos ne servent pas de fond.
 */
const panes: { key: MediaKey; label: string; side?: boolean; d?: string; priority?: boolean }[] = [
  { key: 'painCampagne', label: 'Le pain', side: true, d: '.1s' },
  { key: 'eclairsVitrine', label: 'La vitrine', priority: true },
  { key: 'tartePommes', label: 'Les tartes', side: true, d: '.2s' },
];

export function HeroVitrine() {
  return (
    <section className="hero2">
      <div className="shell">
        <div className="hero2-top"><OpenState /></div>

        <h1 className="ti s1">
          <span>Aux Merveilles</span>
          <em>de Rantigny</em>
        </h1>
        <p className="hero2-say rise" data-d=".08s">
          Boulangerie, pâtisserie et sandwicherie, avenue de Rantigny.
        </p>

        <div className="vitrine">
          {panes.map((pane) => {
            const img = media[pane.key];
            return (
              <figure
                className={`arch curtain ${pane.side ? 'side' : 'mid'}`}
                data-d={pane.d}
                key={pane.key}
                style={{ margin: 0 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={pane.priority}
                  sizes="(max-width:760px) 100vw, 33vw"
                  quality={86}
                  style={{ objectFit: 'cover' }}
                />
                <figcaption>{pane.label}</figcaption>
              </figure>
            );
          })}
        </div>
        <div className="sill" aria-hidden="true" />

        <div className="hero2-cta rise" data-d=".12s">
          <Link className="p p--main" href="/nos-produits">Voir ce qu’il y a en vitrine<Arrow /></Link>
          <Link className="p p--line" href="/contact">Venir à la boutique</Link>
        </div>
      </div>
    </section>
  );
}
