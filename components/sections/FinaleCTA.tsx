import Link from 'next/link';
import { Photo } from '@/components/ui/Photo';
import { Arrow } from '@/components/ui/Arrow';
import { Steps } from './Steps';

/**
 * Gâteaux d'occasion : la section commerciale.
 * Aucune promesse de produit non confirmé : chaque demande est étudiée par la boutique.
 */
export function FinaleCTA({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <section className="fete" aria-labelledby="fete-title">
      <div className="fete-media" data-reveal="mask">
        <Photo k="coeurs" sizes="(max-width: 900px) 100vw, 58vw" pos="45% 35%" />
      </div>

      <div className="fete-body">
        <p className="kicker kicker--ink">Anniversaires · fêtes · gâteaux personnalisés</p>
        <H id="fete-title" className="d d-xl" data-reveal="rise">
          Une occasion <span className="it">à fêter&nbsp;?</span>
        </H>
        <p className="fete-lead">
          Décrivez-nous l’occasion, la date et le nombre de personnes. La boutique étudie votre demande
          et vous dit ce qu’il est possible de préparer, dans quel format et à quel tarif.
        </p>
        <Link className="cta cta--ink" href="/commandes">Parler de mon gâteau<Arrow /></Link>
      </div>

      <Steps />
    </section>
  );
}
