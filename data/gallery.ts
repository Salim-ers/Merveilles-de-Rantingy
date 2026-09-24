import { type MediaKey } from './media';

/**
 * « La vitrine du jour » : mosaïque éditoriale sur une grille de 12 colonnes.
 * col / row = emplacement exact sur desktop (aucun trou : les blocs s'emboîtent).
 * mobile = "wide" (pleine largeur) ou "half" (deux par ligne).
 */
export type Tile = {
  key: MediaKey;
  name: string;
  category: string;
  col: string;
  row: string;
  mobile: 'wide' | 'half';
};

export const vitrine: Tile[] = [
  { key: 'entremetsFruits', name: 'Entremets aux fruits', category: 'Pâtisserie', col: '1 / 7', row: '1 / 6', mobile: 'wide' },
  { key: 'painCampagne', name: 'Pain de campagne', category: 'Boulangerie', col: '7 / 10', row: '1 / 6', mobile: 'half' },
  { key: 'macarons', name: 'Macarons géants', category: 'Pâtisserie', col: '10 / 13', row: '1 / 4', mobile: 'half' },
  { key: 'flans', name: 'Flans pâtissiers', category: 'Flans & tartes', col: '10 / 13', row: '4 / 6', mobile: 'wide' },
  { key: 'coeurs', name: 'Gâteaux cœur', category: 'Gâteaux', col: '1 / 5', row: '6 / 10', mobile: 'half' },
  { key: 'entremetsIndiv', name: 'Entremets individuels', category: 'Pâtisserie', col: '5 / 8', row: '6 / 10', mobile: 'half' },
  { key: 'interieur', name: 'Les comptoirs', category: 'La boutique', col: '8 / 13', row: '6 / 10', mobile: 'wide' },
  { key: 'tartePommes', name: 'Tarte aux pommes', category: 'Flans & tartes', col: '1 / 4', row: '10 / 14', mobile: 'half' },
  { key: 'eclairs', name: 'Éclairs aux fraises', category: 'Pâtisserie', col: '4 / 9', row: '10 / 14', mobile: 'half' },
  { key: 'facade', name: 'La devanture', category: 'La boutique', col: '9 / 13', row: '10 / 14', mobile: 'wide' },
];
