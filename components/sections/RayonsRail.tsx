import Image from 'next/image';
import Link from 'next/link';
import { rayons, autresActivites } from '@/data/products';
import { media } from '@/data/media';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Les rayons en rail horizontal : défilement natif (scroll-snap), swipe sur mobile,
 * aucun JavaScript de carrousel.
 */
export function RayonsRail() {
  return (
    <section className="sec ivory">
      <div className="shell">
        <div className="head">
          <div>
            <Eyebrow>Ce qu’on met en vitrine</Eyebrow>
            <h2 className="ti s2 rise" data-d=".05s">Six rayons,<br /><em>une seule adresse.</em></h2>
          </div>
          <p className="lead rise" data-d=".1s" style={{ maxWidth: '32ch' }}>
            La vitrine change au fil des jours et des saisons. Voilà ce qu’on y retrouve toute l’année.
          </p>
        </div>

        <div className="rail-wrap">
          <div className="rail">
            {rayons.map((rayon) => {
              const img = media[rayon.image];
              return (
                <Link href={rayon.href} key={rayon.name}>
                  <figure className="arch" style={{ margin: 0 }}>
                    <Image src={img.src} alt={img.alt} fill sizes="286px" style={{ objectFit: 'cover' }} />
                  </figure>
                  <h3>{rayon.name}</h3>
                  <p>{rayon.text}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <p className="rail-hint">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          Faites glisser — et aussi, selon la saison : {autresActivites}.
        </p>
      </div>
    </section>
  );
}
