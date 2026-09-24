import { site } from '@/data/site';

const Star = ({ dim = false }: { dim?: boolean }) => (
  <svg viewBox="0 0 24 24" opacity={dim ? 0.35 : 1} aria-hidden="true">
    <path d="M12 2l2.9 6.3 6.8.8-5 4.7 1.3 6.8L12 17.3 6 20.6l1.3-6.8-5-4.7 6.8-.8z" />
  </svg>
);

/**
 * Par défaut, seul le nombre d'avis est montré (site.reviews.showRating = false) :
 * aucun témoignage n'est inventé, le visiteur va lire les avis à la source.
 */
export function ReviewsBlock() {
  const full = Math.floor(site.reviews.rating);
  return (
    <section className="sec sec--tight ivory">
      <div className="shell">
        <div className="reviews grow">
          <div className="score">
            <div className="bubble">{site.reviews.showRating ? site.reviews.rating.toLocaleString('fr-FR') : site.reviews.count}</div>
            <div>
              <p style={{ fontWeight: 700 }}>
                {site.reviews.showRating ? `sur 5 — ${site.reviews.count} avis ${site.reviews.source}` : `avis ${site.reviews.source}`}
              </p>
              {site.reviews.showRating && (
                <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} dim={i >= full} />)}</div>
              )}
              <p className="lead" style={{ marginTop: 4, maxWidth: '30ch' }}>
                Les clients de Rantigny laissent leur avis sur la fiche {site.reviews.source} de la boutique.
              </p>
            </div>
          </div>
          <a className="p p--line" href={site.googleBusinessUrl ?? site.maps.search} target="_blank" rel="noopener">
            Lire les avis
          </a>
        </div>
      </div>
    </section>
  );
}
