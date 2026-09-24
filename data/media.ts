/**
 * Photographies authentiques de la boutique, stockées dans /public/images.
 * Aucune banque d'images, aucun lien vers un site tiers.
 *
 * width / height = dimensions RÉELLES du fichier : `npm run check:assets`
 * (lancé automatiquement avant chaque build) les vérifie.
 * pos = point focal utilisé pour les recadrages (object-position).
 */
export type Media = { src: string; alt: string; width: number; height: number; pos?: string };

export const media = {
  facade: {
    src: '/images/boutique/aux-merveilles-rantigny-facade.webp',
    alt: 'Devanture noire et stores orange de la boulangerie-pâtisserie, avenue de Rantigny',
    width: 1254, height: 1254, pos: '50% 55%',
  },
  interieur: {
    src: '/images/boutique/aux-merveilles-rantigny-interieur-boutique.webp',
    alt: 'Intérieur de la boutique : comptoirs vitrés de pâtisseries, sandwichs, pains en corbeilles et boissons fraîches',
    width: 1254, height: 1254, pos: '55% 60%',
  },
  painCampagne: {
    src: '/images/boulangerie/aux-merveilles-rantigny-pain-de-campagne.webp',
    alt: 'Grand pain de campagne à la croûte dorée, scarifiée en losanges',
    width: 1254, height: 1254, pos: '52% 50%',
  },
  flans: {
    src: '/images/patisserie/aux-merveilles-rantigny-flans-patissiers.webp',
    alt: 'Deux flans pâtissiers à la surface caramélisée, devant une rangée d’éclairs et de mille-feuilles',
    width: 1254, height: 1254, pos: '50% 0%',
  },
  entremetsFruits: {
    src: '/images/patisserie/aux-merveilles-rantigny-entremets-fruits.webp',
    alt: 'Entremets au glaçage miroir jaune et rouge, décoré de macarons, de fraises et de myrtilles',
    width: 1254, height: 1254, pos: '50% 45%',
  },
  eclairsFraises: {
    src: '/images/patisserie/aux-merveilles-rantigny-eclairs-fraises.webp',
    alt: 'Éclairs garnis de chantilly et de fraises fraîches',
    width: 1254, height: 1254, pos: '55% 55%',
  },
  eclairs: {
    src: '/images/patisserie/aux-merveilles-rantigny-eclairs-vitrine.webp',
    alt: 'Éclairs à la chantilly et aux fraises, macarons géants en arrière-plan',
    width: 1254, height: 1254, pos: '58% 55%',
  },
  macarons: {
    src: '/images/patisserie/aux-merveilles-rantigny-macarons-fraises.webp',
    alt: 'Macarons géants roses garnis de crème et de fraises entières, saupoudrés de sucre glace',
    width: 1254, height: 1254, pos: '45% 55%',
  },
  coeurs: {
    src: '/images/gateaux/aux-merveilles-rantigny-gateaux-coeur.webp',
    alt: 'Deux gâteaux en forme de cœur : un red velvet à la crème et un entremets au glaçage rouge',
    width: 1254, height: 1254, pos: '50% 58%',
  },
  tartePommes: {
    src: '/images/patisserie/aux-merveilles-rantigny-tarte-aux-pommes.webp',
    alt: 'Grande tarte aux pommes à la pâte brisée dorée',
    width: 1254, height: 1254, pos: '50% 50%',
  },
  entremetsIndiv: {
    src: '/images/patisserie/aux-merveilles-rantigny-entremets-individuels.webp',
    alt: 'Entremets individuels au glaçage jaune, surmontés de fraises, framboises et myrtilles',
    width: 1122, height: 1402, pos: '60% 55%',
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
