import Link from 'next/link';
import type { Metadata } from 'next';
import { site } from '@/data/site';

export const metadata: Metadata = { title: 'Demande non envoyée', robots: { index: false, follow: false } };

/** Retour après un envoi sans JavaScript qui n'a pas pu aboutir (champ invalide, service indisponible). */
export default function NotSentPage() {
  return (
    <section className="notice cadre">
      <p className="kicker">Oups</p>
      <h1 className="d d-xl">Demande <span className="it">non envoyée.</span></h1>
      <p>
        Un champ est peut-être incomplet (téléphone, date à venir, nombre de personnes…) ou le service d’envoi est
        momentanément indisponible. Revenez en arrière pour vérifier la fiche, ou appelez directement la boutique.
      </p>
      <div className="notice-acts">
        <a className="cta cta--orange" href={site.phone.href}>Appeler le {site.phone.display}</a>
        <Link className="cta cta--line-ink" href="/commandes">Revenir à la fiche</Link>
      </div>
    </section>
  );
}
