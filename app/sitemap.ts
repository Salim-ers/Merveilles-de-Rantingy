import type { MetadataRoute } from 'next';
import { site } from '@/data/site';
import { hasNews } from '@/data/news';

const routes = [
  { path: '/', priority: 1 },
  { path: '/nos-produits', priority: 0.9 },
  { path: '/commandes', priority: 0.9 },
  { path: '/la-boutique', priority: 0.7 },
  { path: '/contact', priority: 0.8 },
  ...(hasNews ? [{ path: '/actualites', priority: 0.6 }] : []),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }));
}
