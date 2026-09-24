import { hasNews } from './news';
import type { MediaKey } from './media';

export type NavItem = { label: string; href: string; image?: MediaKey; pos?: string };

/** Les Actualités n'apparaissent que si au moins une publication réelle existe. */
export const nav: NavItem[] = [
  { label: 'La vitrine', href: '/nos-produits', image: 'macarons', pos: '45% 58%' },
  { label: 'Gâteaux d’occasion', href: '/commandes', image: 'coeurs', pos: '70% 50%' },
  { label: 'La boutique', href: '/la-boutique', image: 'facade', pos: '40% 60%' },
  ...(hasNews ? [{ label: 'Actualités', href: '/actualites' }] : []),
  { label: 'Horaires & accès', href: '/contact', image: 'interieur', pos: '50% 60%' },
];
