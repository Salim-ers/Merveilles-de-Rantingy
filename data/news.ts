import { type MediaKey } from './media';

/**
 * Modèles d'actualités : rien n'est publié tant que la boutique n'a pas fourni
 * de vrai contenu (draft: true). Aucune fausse actualité datée.
 */
export type Post = {
  slug: string; title: string; excerpt: string; image: MediaKey;
  category: string; date: string | null; draft: boolean;
};

export const posts: Post[] = [
  { slug: 'vitrine-du-moment', title: 'La vitrine du moment', category: 'Vitrine', date: null, draft: true,
    excerpt: 'Emplacement prévu pour annoncer ce qui sort du laboratoire cette semaine.', image: 'eclairsVitrine' },
  { slug: 'commandes-de-fete', title: 'Les commandes de fête', category: 'Commandes', date: null, draft: true,
    excerpt: 'Emplacement prévu pour les délais et les pièces disponibles avant les fêtes.', image: 'coeurs' },
  { slug: 'horaires-exceptionnels', title: 'Horaires exceptionnels', category: 'Infos', date: null, draft: true,
    excerpt: 'Emplacement prévu pour signaler une fermeture ou un horaire modifié.', image: 'facade' },
];

export const publishedPosts = posts.filter((p) => !p.draft);
