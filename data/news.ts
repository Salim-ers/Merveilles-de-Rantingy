import { type MediaKey } from './media';

/**
 * Actualités RÉELLES de la boutique (galette, Pâques, Noël, fermeture exceptionnelle…).
 * Tant que ce tableau est vide, la page /actualites renvoie une 404 et disparaît
 * de la navigation comme du sitemap. Ne jamais publier de contenu fictif.
 *
 * Exemple d'entrée :
 * { slug: 'galette-2027', title: 'Les galettes sont arrivées', date: '2027-01-02',
 *   category: 'Saison', excerpt: '…', image: 'tartePommes' }
 */
export type Post = {
  slug: string;
  title: string;
  /** Format AAAA-MM-JJ. */
  date: string;
  category: 'Saison' | 'Nouveauté' | 'Horaires' | 'Boutique';
  excerpt: string;
  image?: MediaKey;
};

export const posts: Post[] = [];

export const hasNews = posts.length > 0;
