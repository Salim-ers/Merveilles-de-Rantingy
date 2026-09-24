import Image from 'next/image';
import Link from 'next/link';
import { media } from '@/data/media';
import { Arrow } from '@/components/ui/Arrow';

/** Grande carte photo aux angles arrondis, posée dans la page (pas de plein écran). */
export function ShopBand() {
  return (
    <section className="sec sec--tight ivory">
      <div className="shell">
        <div className="band curtain">
          <Image src={media.interieur.src} alt={media.interieur.alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
          <div className="in">
            <h2 className="ti s2">Poussez la porte,<br />la vitrine fait le reste.</h2>
            <Link className="p p--cream" href="/nos-produits#galerie">Voir la galerie<Arrow /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
