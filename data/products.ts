import { type MediaKey } from './media';

/**
 * Catalogue de la boutique. AUCUN prix, ingrédient ou allergène n'est indiqué :
 * ces informations ne sont pas confirmées. Une description ne décrit que ce
 * que montrent les photographies ou ce que déclare le registre du commerce.
 */

export type CategoryId =
  | 'pains'
  | 'viennoiseries'
  | 'patisseries'
  | 'flans-tartes'
  | 'gateaux'
  | 'sale'
  | 'boissons';

export type Category = {
  id: CategoryId;
  label: string;
  /** Phrase courte pour la signalétique d'accueil. */
  line: string;
  image?: MediaKey;
  /** Recadrage spécifique à la signalétique. */
  pos?: string;
};

export const categories: Category[] = [
  { id: 'pains', label: 'Pains', line: 'Grosses pièces à la croûte dorée', image: 'painCampagne' },
  { id: 'viennoiseries', label: 'Viennoiseries', line: 'Pour le matin, au comptoir' },
  { id: 'patisseries', label: 'Pâtisseries', line: 'Éclairs, macarons géants, entremets', image: 'eclairs' },
  { id: 'flans-tartes', label: 'Flans & tartes', line: 'Grandes pièces à partager', image: 'tartePommes' },
  { id: 'gateaux', label: 'Gâteaux', line: 'Pour les occasions, sur demande', image: 'coeurs' },
  { id: 'sale', label: 'Salé', line: 'Sandwichs en vitrine réfrigérée', image: 'interieur', pos: '88% 70%' },
  { id: 'boissons', label: 'Boissons', line: 'Boissons fraîches à emporter', image: 'interieur', pos: '72% 40%' },
];

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  text?: string;
  image?: MediaKey;
  /** Préparé sur demande : renvoie vers la page commandes. */
  onRequest?: boolean;
};

export const products: Product[] = [
  { id: 'pain-campagne', name: 'Pain de campagne', category: 'pains', image: 'painCampagne',
    text: 'Grosse pièce à la croûte scarifiée en losanges.' },
  { id: 'pains-du-jour', name: 'Pains du quotidien', category: 'pains',
    text: 'La sélection du jour est présentée en corbeilles, derrière le comptoir.' },

  { id: 'viennoiseries', name: 'Viennoiseries', category: 'viennoiseries',
    text: 'Demandez la sélection du jour en boutique.' },

  { id: 'macarons-geants', name: 'Macarons géants', category: 'patisseries', image: 'macarons',
    text: 'Coques roses, crème et fraises entières, voile de sucre glace.' },
  { id: 'eclairs-fraises', name: 'Éclairs aux fraises', category: 'patisseries', image: 'eclairs',
    text: 'Chantilly en rosaces et fraises fraîches coupées.' },
  { id: 'entremets-individuels', name: 'Entremets individuels', category: 'patisseries', image: 'entremetsIndiv',
    text: 'Glaçage miroir jaune, fraises, framboises et myrtilles.' },
  { id: 'entremets', name: 'Entremets à partager', category: 'patisseries', image: 'entremetsFruits',
    text: 'Glaçage miroir, macarons et fruits frais posés dessus.' },

  { id: 'flan', name: 'Flan pâtissier', category: 'flans-tartes', image: 'flans',
    text: 'Haut, doré, la surface bien caramélisée.' },
  { id: 'tarte-pommes', name: 'Tarte aux pommes', category: 'flans-tartes', image: 'tartePommes',
    text: 'Grande tarte à partager, pâte dorée.' },

  { id: 'gateaux-coeur', name: 'Gâteaux cœur', category: 'gateaux', image: 'coeurs',
    text: 'Red velvet à la crème ou entremets au glaçage rouge.' },
  { id: 'gateau-occasion', name: 'Gâteau d’occasion', category: 'gateaux', onRequest: true,
    text: 'Anniversaire, fête de famille : décrivez votre demande, la boutique vous rappelle.' },

  { id: 'sandwichs', name: 'Sandwichs', category: 'sale', image: 'interieur',
    text: 'En vitrine réfrigérée, à emporter.' },

  { id: 'boissons', name: 'Boissons fraîches', category: 'boissons',
    text: 'Au réfrigérateur de la boutique, à emporter.' },
];

export const productsBy = (id: CategoryId) => products.filter((p) => p.category === id);
