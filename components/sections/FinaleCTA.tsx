import Image from 'next/image';
import { media } from '@/data/media';
import { site, fullAddress } from '@/data/site';
import { Arrow } from '@/components/ui/Arrow';

export function FinaleCTA() {
  return (
    <section className="sec finale">
      <div className="shell">
        <figure className="round grow" style={{ margin: '0 auto clamp(20px,3vw,32px)' }}>
          <Image src={media.flans.src} alt={media.flans.alt} fill sizes="150px" style={{ objectFit: 'cover' }} />
        </figure>
        <h2 className="ti s1 rise">On vous garde<br /><em>un flan ?</em></h2>
        <p className="lead rise" data-d=".06s">
          {fullAddress}. Ouvert de 6h30 à 20h, tous les jours sauf le jeudi.
        </p>
        <div className="acts rise" data-d=".1s">
          <a className="p p--main" href={site.maps.directions} target="_blank" rel="noopener">Venir à la boutique<Arrow /></a>
          <a className="p p--line" href={site.phone.href}>{site.phone.display}</a>
        </div>
      </div>
    </section>
  );
}
