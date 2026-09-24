import Image from 'next/image';
import { media } from '@/data/media';

/** Respiration courte : une phrase, une photo ronde. Rien d'autre. */
export function MatinIntro() {
  return (
    <section className="sec sec--tight cream">
      <div className="shell matin">
        <figure className="round grow" style={{ margin: 0 }}>
          <Image src={media.painCampagne.src} alt={media.painCampagne.alt} fill sizes="230px" style={{ objectFit: 'cover' }} />
        </figure>
        <div>
          <p className="rise">
            Le pain sort à <b>6h30</b>.<br />Les éclairs suivent.<br />
            Le reste de la journée, on garnit la vitrine.
          </p>
        </div>
      </div>
    </section>
  );
}
