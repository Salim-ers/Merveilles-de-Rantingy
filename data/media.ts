/**
 * Photographies authentiques de la boutique. Aucune banque d'images.
 * Noms de fichiers pensés pour le référencement local.
 */
export type Media = { src: string; alt: string; ratio: number };

export const media = {
  facade: { src: '/images/boutique/aux-merveilles-rantigny-facade.webp',
    alt: 'Façade noire et orange de la boulangerie-pâtisserie Aux Merveilles de Rantigny', ratio: 1 },
  interieur: { src: '/images/boutique/aux-merveilles-rantigny-interieur-boutique.webp',
    alt: 'Intérieur de la boutique : comptoirs vitrés, pains, sandwichs et boissons', ratio: 1 },
  painCampagne: { src: '/images/boulangerie/aux-merveilles-rantigny-pain-de-campagne.webp',
    alt: 'Gros pain de campagne à la croûte scarifiée en losanges', ratio: 1 },
  flans: { src: '/images/patisserie/aux-merveilles-rantigny-flans-patissiers.webp',
    alt: 'Deux flans pâtissiers caramélisés devant une rangée d’éclairs', ratio: 1 },
  entremetsFruits: { src: '/images/patisserie/aux-merveilles-rantigny-entremets-fruits.webp',
    alt: 'Entremets rond au glaçage jaune et rouge, macarons et fruits frais', ratio: 1 },
  eclairs: { src: '/images/patisserie/aux-merveilles-rantigny-eclairs-fraises.webp',
    alt: 'Éclairs garnis de chantilly et de fraises fraîches', ratio: 1 },
  eclairsVitrine: { src: '/images/patisserie/aux-merveilles-rantigny-eclairs-vitrine.webp',
    alt: 'Éclairs aux fraises et macarons géants préparés en boutique', ratio: 1 },
  macarons: { src: '/images/patisserie/aux-merveilles-rantigny-macarons-fraises.webp',
    alt: 'Macarons géants à la fraise garnis de crème et de fraises entières', ratio: 1 },
  coeurs: { src: '/images/gateaux/aux-merveilles-rantigny-gateaux-coeur.webp',
    alt: 'Gâteaux en forme de cœur, glaçage rouge et red velvet', ratio: 1 },
  tartePommes: { src: '/images/patisserie/aux-merveilles-rantigny-tarte-aux-pommes.webp',
    alt: 'Grande tarte aux pommes dorée à la pâte brisée', ratio: 1 },
  entremetsIndiv: { src: '/images/patisserie/aux-merveilles-rantigny-entremets-individuels.webp',
    alt: 'Entremets individuels au glaçage jaune, fraises et framboises', ratio: 1122 / 1402 },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
