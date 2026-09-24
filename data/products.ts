import { type MediaKey } from './media';

/**
 * Les rayons présentés en médaillons sur l'accueil.
 * Chacun s'appuie sur une vraie photo : pas de rayon sans image.
 * Les activités sans photographie (viennoiserie, glaces, confiserie, traiteur)
 * sont mentionnées en une ligne sous la grille.
 */
export type Rayon = { name: string; text: string; href: string; cta: string; image: MediaKey };

export const rayons: Rayon[] = [
  { name: 'Pains', href: '/nos-produits?r=pains', cta: 'Voir', image: 'painCampagne',
    text: 'Baguettes, pains spéciaux et grosses pièces.' },
  { name: 'Pâtisseries', href: '/nos-produits?r=patisseries', cta: 'Voir', image: 'eclairsVitrine',
    text: 'Éclairs, choux, pièces individuelles.' },
  { name: 'Entremets', href: '/nos-produits?r=patisseries', cta: 'Voir', image: 'entremetsIndiv',
    text: 'Glaçage miroir et fruits frais dessus.' },
  { name: 'Tartes & flans', href: '/nos-produits?r=tartes', cta: 'Voir', image: 'tartePommes',
    text: 'Grandes pièces à partager, à la part aussi.' },
  { name: 'Gâteaux d’occasion', href: '/commandes', cta: 'Commander', image: 'coeurs',
    text: 'Anniversaires et fêtes, sur commande.' },
  { name: 'Sandwichs & boissons', href: '/nos-produits?r=snacking', cta: 'Voir', image: 'interieur',
    text: 'De quoi composer un déjeuner rapide.' },
];

/** Mentionnées au registre, mais sans photographie fournie à ce jour. */
export const autresActivites = 'viennoiseries, glaces, confiserie et propositions traiteur';

export type Rayonnage = 'pains' | 'viennoiseries' | 'patisseries' | 'tartes' | 'gateaux' | 'snacking' | 'gourmandises';

export const rayonFilters: { id: Rayonnage | 'tout'; label: string }[] = [
  { id: 'tout', label: 'Tout' },
  { id: 'pains', label: 'Pains' },
  { id: 'patisseries', label: 'Pâtisseries' },
  { id: 'tartes', label: 'Tartes & flans' },
  { id: 'gateaux', label: 'Gâteaux' },
  { id: 'snacking', label: 'Snacking' },
];

export type Produit = {
  id: string; name: string; rayon: Rayonnage; image: MediaKey;
  text: string; how: 'boutique' | 'commande';
};

/** Aucun prix : la boutique reste seule à les communiquer. */
export const produits: Produit[] = [
  { id: 'pain-campagne', name: 'Pain de campagne', rayon: 'pains', image: 'painCampagne', how: 'boutique',
    text: 'Grosse pièce à la croûte scarifiée, à la coupe ou entière.' },
  { id: 'eclairs', name: 'Éclairs aux fraises', rayon: 'patisseries', image: 'eclairs', how: 'boutique',
    text: 'Chantilly montée et fraises coupées à la main.' },
  { id: 'macarons', name: 'Macarons géants', rayon: 'patisseries', image: 'macarons', how: 'boutique',
    text: 'Format XXL, crème et fraises entières.' },
  { id: 'entremets-indiv', name: 'Entremets individuels', rayon: 'patisseries', image: 'entremetsIndiv', how: 'boutique',
    text: 'Glaçage miroir, fruits frais posés dessus.' },
  { id: 'entremets', name: 'Entremets à partager', rayon: 'patisseries', image: 'entremetsFruits', how: 'boutique',
    text: 'Pièce ronde, glaçage et macarons.' },
  { id: 'flans', name: 'Flan pâtissier', rayon: 'tartes', image: 'flans', how: 'boutique',
    text: 'Bien caramélisé, en part ou en pièce entière.' },
  { id: 'tarte-pommes', name: 'Tarte aux pommes', rayon: 'tartes', image: 'tartePommes', how: 'boutique',
    text: 'Grande tarte à partager, pâte dorée.' },
  { id: 'coeurs', name: 'Gâteaux cœur', rayon: 'gateaux', image: 'coeurs', how: 'commande',
    text: 'Red velvet ou glaçage rouge, pour les occasions.' },
  { id: 'vitrine-eclairs', name: 'Pâtisseries du jour', rayon: 'patisseries', image: 'eclairsVitrine', how: 'boutique',
    text: 'Ce qui sort du laboratoire change selon les jours.' },
  { id: 'snacking', name: 'Sandwichs & boissons', rayon: 'snacking', image: 'interieur', how: 'boutique',
    text: 'Vitrine réfrigérée, à emporter le midi.' },
];
