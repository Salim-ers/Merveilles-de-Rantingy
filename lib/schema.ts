import { site } from '@/data/site';
import { media } from '@/data/media';
import { openingHours } from '@/data/opening-hours';

const EN: Record<number, string> = {
  0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday',
};

/** JSON-LD Bakery : uniquement des données vérifiées (pas de GPS, pas de note, pas de numéro de voirie). */
export function bakerySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': `${site.url}/#bakery`,
    name: site.name,
    legalName: site.legal.name,
    description: site.shortDescription,
    url: site.url,
    telephone: site.phone.international.replace(/\s/g, ''),
    image: [media.facade, media.entremetsFruits, media.interieur].map((m) => `${site.url}${m.src}`),
    servesCuisine: ['Boulangerie', 'Pâtisserie', 'Sandwicherie'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    ...(site.geo ? { geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } } : {}),
    openingHoursSpecification: openingHours
      .filter((d) => d.intervals.length > 0)
      .flatMap((d) => d.intervals.map((i) => ({
        '@type': 'OpeningHoursSpecification', dayOfWeek: EN[d.day], opens: i.open, closes: i.close,
      }))),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.name, item: `${site.url}${item.path}`,
    })),
  };
}

/** Sérialisation sûre pour une balise <script type="application/ld+json">. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
