import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/data/site';
import { Arrow } from '@/components/ui/Arrow';

export const metadata: Metadata = { title: 'Demande envoyée', robots: { index: false, follow: false } };

/** Confirmation après un envoi de formulaire sans JavaScript. */
export default function SentPage() {
  return (
    <section className="notice cadre">
      <p className="kicker">Merci</p>
      <h1 className="d d-xl">Demande <span className="it">bien reçue.</span></h1>
      <p>
        La boutique vous rappelle pour en parler. Rien n’est confirmé tant que vous n’avez pas convenu ensemble
        de la disponibilité, du format et du tarif. Une question d’ici là ? <a href={site.phone.href}>{site.phone.display}</a>.
      </p>
      <Link className="cta cta--ink" href="/">Retour à l’accueil<Arrow /></Link>
    </section>
  );
}
