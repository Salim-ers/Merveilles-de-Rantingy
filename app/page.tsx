import { HeroVitrine } from '@/components/sections/HeroVitrine';
import { QuickFacts } from '@/components/sections/QuickFacts';
import { MatinIntro } from '@/components/sections/MatinIntro';
import { RayonsRail } from '@/components/sections/RayonsRail';
import { TroisMerveilles } from '@/components/sections/TroisMerveilles';
import { ShopBand } from '@/components/sections/ShopBand';
import { HoursCard } from '@/components/sections/HoursCard';
import { ReviewsBlock } from '@/components/sections/ReviewsBlock';
import { InfoBlock } from '@/components/sections/InfoBlock';
import { FinaleCTA } from '@/components/sections/FinaleCTA';

/**
 * Accueil : la devanture d'abord, les informations utiles juste après,
 * puis la vitrine, les pièces signature et l'adresse.
 */
export default function HomePage() {
  return (
    <>
      <HeroVitrine />
      <QuickFacts />
      <MatinIntro />
      <RayonsRail />
      <TroisMerveilles />
      <ShopBand />
      <HoursCard />
      <ReviewsBlock />
      <InfoBlock />
      <FinaleCTA />
    </>
  );
}
