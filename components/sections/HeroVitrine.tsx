import Link from 'next/link';
import { site } from '@/data/site';
import { hoursSummary } from '@/lib/business-status';
import { Photo } from '@/components/ui/Photo';
import { OpenState } from '@/components/ui/OpenState';
import { Arrow } from '@/components/ui/Arrow';

/**
 * HERO COLLAGE — la vitrine vue du trottoir.
 * Une grande pièce (l'entremets miroir), deux photos verticales en complément,
 * et le nom posé sur des bandeaux pleins qui chevauchent les images :
 * il reste lisible quelle que soit la photo dessous.
 * Les métiers courent à la verticale le long de la grande photo, comme sur un montant de vitrine.
 */
export function HeroVitrine() {
  return (
    <section className="collage" aria-labelledby="hero-title">
      <div className="collage-grid">
        <h1 className="collage-title" id="hero-title">
          <span className="rb rb-aux">Aux</span>
          <span className="rb rb-mer">Merveilles</span>
          <span className="rb rb-de">de Rantigny</span>
        </h1>

        <Photo
          k="entremetsFruits"
          className="collage-big"
          sizes="(max-width: 1023px) 100vw, 64vw"
          priority
          quality={80}
          pos="50% 42%"
        >
          <figcaption className="collage-strip">
            {site.trades.map((t) => <span key={t}>{t}</span>)}
          </figcaption>
        </Photo>

        <Photo k="eclairs" className="collage-s1" sizes="(max-width: 1023px) 50vw, 24vw" pos="60% 50%" />
        <Photo k="painCampagne" className="collage-s2" sizes="(max-width: 1023px) 46vw, 17vw" pos="52% 50%" />

        <div className="collage-foot">
          <p className="collage-where">
            <OpenState variant="today" fallback={hoursSummary()} />
            <span>{site.address.street}, {site.address.city}</span>
          </p>
          <div className="collage-cta">
            <Link className="cta cta--orange" href="/nos-produits">Voir la vitrine<Arrow /></Link>
            <Link className="cta cta--line" href="/commandes">Commander un gâteau</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
