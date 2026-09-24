import { HeroVitrine } from '@/components/sections/HeroVitrine';
import { TroisMerveilles } from '@/components/sections/TroisMerveilles';
import { RayonsRail } from '@/components/sections/RayonsRail';
import { PhotoGrid } from '@/components/gallery/PhotoGrid';
import { FinaleCTA } from '@/components/sections/FinaleCTA';
import { ShopBand } from '@/components/sections/ShopBand';
import { HoursCard } from '@/components/sections/HoursCard';

/**
 * Accueil : la vitrine d'abord (hero collage, pièces signature, rayons, mosaïque),
 * puis la commande d'occasion, la boutique et les horaires.
 */
export default function HomePage() {
  return (
    <>
      <HeroVitrine />
      <TroisMerveilles />
      <RayonsRail />

      <section className="vit" aria-labelledby="vit-title">
        <div className="cadre vit-head">
          <h2 id="vit-title" className="d d-xl" data-reveal="rise">La vitrine <span className="it">du jour</span></h2>
          <p className="vit-lead">
            Photographies prises en boutique. Ce qui est présenté change selon les jours et les saisons :
            touchez une photo pour l’agrandir.
          </p>
        </div>
        <div className="cadre">
          <PhotoGrid />
        </div>
      </section>

      <FinaleCTA />
      <ShopBand />
      <HoursCard />
    </>
  );
}
