/**
 * ------------------------------------------------------------------
 * CONFIGURATION CENTRALE — Aux Merveilles de Rantigny
 * Une information se change ici, et nulle part ailleurs.
 * Sources vérifiées : registre des entreprises (SIREN 897 943 874)
 * et fiche Google de l'établissement.
 *
 * Les informations NON confirmées restent à null et ne sont jamais
 * affichées : la liste des points ouverts est tenue dans README.md.
 * ------------------------------------------------------------------
 */

const FALLBACK_URL = 'https://merveilles-de-rantingy-one.vercel.app';

/** URL publique : variable explicite, sinon domaine de production Vercel, sinon l'URL actuelle. */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  ];
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    try {
      return new URL(value).origin;
    } catch {
      /* valeur invalide : on passe à la suivante */
    }
  }
  return FALLBACK_URL;
}

export const site = {
  name: 'Aux Merveilles de Rantigny',
  /** Graphie de la devanture (« Merveilles de Ravigny ») : non utilisée, à arbitrer avec le client. */
  signboard: 'Merveilles de Ravigny',
  trades: ['Boulangerie', 'Pâtisserie', 'Sandwicherie'],
  shortDescription:
    'Boulangerie-pâtisserie et sandwicherie avenue de Rantigny (60290) : pains, pâtisseries, entremets, flans, tartes et gâteaux d’occasion sur demande.',
  url: resolveSiteUrl(),

  phone: { display: '09 80 67 05 88', href: 'tel:+33980670588', international: '+33 9 80 67 05 88' },

  /** Non communiquée à ce jour. */
  email: null as string | null,

  address: {
    /** Seule forme validée. Ne jamais ajouter de numéro de voirie non confirmé. */
    street: 'Avenue de Rantigny',
    postalCode: '60290',
    city: 'Rantigny',
    region: 'Hauts-de-France',
    department: 'Oise',
    countryCode: 'FR',
  },

  /** Coordonnées GPS non vérifiées : absentes du JSON-LD tant qu'elles ne le sont pas. */
  geo: null as { lat: number; lng: number } | null,

  maps: {
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Aux Merveilles de Rantigny, Avenue de Rantigny, 60290 Rantigny'),
  },

  /** Activités déclarées au registre du commerce. */
  activities: [
    'Boulangerie',
    'Pâtisserie',
    'Viennoiserie',
    'Sandwicherie',
    'Tarterie',
    'Confiserie',
    'Glaces',
    'Traiteur',
    'Vente à emporter',
  ],

  legal: {
    name: 'AUX MERVEILLES DE RANTIGNY',
    form: 'SARL',
    capital: '1 000 €',
    siren: '897 943 874',
    siret: '897 943 874 00015',
    rcs: 'RCS Beauvais',
    vat: 'FR 14 897943874',
    activity: 'Boulangerie et boulangerie-pâtisserie (NAF 1071C)',
    since: '2021',
    /** Nom du directeur de la publication, à renseigner une fois confirmé. */
    director: null as string | null,
    host: { name: 'Vercel Inc.', address: '440 N Barranca Ave #4133, Covina, CA 91723, USA' },
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
