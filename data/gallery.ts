import { type MediaKey } from './media';

export type Filtre = 'tout' | 'pain' | 'patisserie' | 'gateaux' | 'boutique';

export const galleryFilters: { id: Filtre; label: string }[] = [
  { id: 'tout', label: 'Tout' },
  { id: 'pain', label: 'Pain' },
  { id: 'patisserie', label: 'Pâtisserie' },
  { id: 'gateaux', label: 'Gâteaux' },
  { id: 'boutique', label: 'Boutique' },
];

export const gallery: { key: MediaKey; filter: Exclude<Filtre, 'tout'> }[] = [
  { key: 'facade', filter: 'boutique' },
  { key: 'painCampagne', filter: 'pain' },
  { key: 'eclairs', filter: 'patisserie' },
  { key: 'macarons', filter: 'patisserie' },
  { key: 'interieur', filter: 'boutique' },
  { key: 'flans', filter: 'patisserie' },
  { key: 'coeurs', filter: 'gateaux' },
  { key: 'entremetsFruits', filter: 'patisserie' },
  { key: 'tartePommes', filter: 'patisserie' },
  { key: 'entremetsIndiv', filter: 'patisserie' },
  { key: 'eclairsVitrine', filter: 'patisserie' },
];
