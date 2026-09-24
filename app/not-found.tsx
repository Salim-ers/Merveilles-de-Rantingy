import Link from 'next/link';
import type { Metadata } from 'next';
import { Photo } from '@/components/ui/Photo';
import { Arrow } from '@/components/ui/Arrow';

export const metadata: Metadata = { title: 'Page introuvable', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="vide">
      <Photo k="tartePommes" className="vide-ph" sizes="(max-width: 900px) 100vw, 45vw" />
      <div className="vide-text">
        <p className="kicker">Erreur 404</p>
        <h1 className="d d-xl">Plus <span className="it">en vitrine.</span></h1>
        <p>Cette page n’existe pas ou n’existe plus. Tout le reste est toujours là.</p>
        <div className="vide-acts">
          <Link className="cta cta--orange" href="/">Retour à l’accueil<Arrow /></Link>
          <Link className="cta cta--line" href="/nos-produits">Voir la vitrine</Link>
        </div>
      </div>
    </section>
  );
}
