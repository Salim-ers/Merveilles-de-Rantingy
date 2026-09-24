import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { media } from '@/data/media';
import { Arrow } from '@/components/ui/Arrow';

export const metadata: Metadata = { title: 'Page introuvable', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="sec finale" style={{ minHeight: '78vh', display: 'grid', placeItems: 'center' }}>
      <div className="shell">
        <figure className="round" style={{ width: 'clamp(94px,12vw,150px)', aspectRatio: '1', margin: '0 auto 26px', border: '5px solid var(--paper)' }}>
          <Image src={media.tartePommes.src} alt={media.tartePommes.alt} fill sizes="150px" style={{ objectFit: 'cover' }} />
        </figure>
        <p className="crumb" style={{ fontWeight: 700, color: 'var(--apricot-deep)', marginBottom: 12 }}>Erreur 404</p>
        <h1 className="ti s2" style={{ maxWidth: '16ch', marginInline: 'auto' }}>
          Cette page-là,<br /><em>on l’a déjà vendue.</em>
        </h1>
        <p className="lead" style={{ margin: '18px auto 0' }}>Il reste tout le reste de la vitrine.</p>
        <div className="acts" style={{ justifyContent: 'center' }}>
          <Link className="p p--main" href="/">Retour à l’accueil<Arrow /></Link>
          <Link className="p p--line" href="/nos-produits">Voir les produits</Link>
        </div>
      </div>
    </section>
  );
}
