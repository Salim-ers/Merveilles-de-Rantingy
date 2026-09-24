/**
 * ------------------------------------------------------------------
 * CONFIGURATION CENTRALE — Aux Merveilles de Rantigny
 * Une information se change ici, et nulle part ailleurs.
 * Sources vérifiées : registre des entreprises (SIREN 897 943 874)
 * et fiche Google de l'établissement.
 * ------------------------------------------------------------------
 */

export const site = {
  name: 'Aux Merveilles de Rantigny',
  /** L'enseigne en façade porte une graphie différente : à arbitrer avec le client. */
  signboard: 'Merveilles de Ravigny',
  baseline: 'Du pain, des gâteaux, et de quoi déjeuner.',
  shortDescription:
    'Boulangerie-pâtisserie et sandwicherie avenue de Rantigny (60290) : pains, viennoiseries, pâtisseries, tartes, gâteaux sur commande et snacking. Ouvert de 6h30 à 20h, fermé le jeudi.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.aux-merveilles-rantigny.fr',

  phone: { display: '09 80 67 05 88', href: 'tel:+33980670588', international: '+33 9 80 67 05 88' },

  /** Non communiquée à ce jour. */
  email: null as string | null,

  address: {
    /** Aucun numéro de voirie n'est publié : à confirmer auprès de la boutique. */
    street: 'Avenue de Rantigny',
    postalCode: '60290',
    city: 'Rantigny',
    region: 'Hauts-de-France',
    department: 'Oise',
    country: 'France',
    countryCode: 'FR',
  },

  /** Coordonnées GPS non vérifiées : volontairement absentes du JSON-LD. */
  geo: null as { lat: number; lng: number } | null,

  maps: {
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('Avenue de Rantigny 60290 Rantigny'),
    search:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Merveilles de Rantigny 60290 Rantigny'),
    embed:
      'https://www.google.com/maps?q=' + encodeURIComponent('Avenue de Rantigny 60290 Rantigny') + '&output=embed',
  },

  googleBusinessUrl: null as string | null,

  reviews: {
    count: 76,
    rating: 3.6,
    source: 'Google',
    /**
     * La note est masquée par défaut : seul le nombre d'avis est affiché,
     * avec un lien vers la fiche. Passer à true pour afficher 3,6/5.
     */
    showRating: false,
  },

  social: { instagram: null as string | null, facebook: null as string | null },

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
    /** Le gérant figure au RCS : à confirmer avant publication. */
    director: null as string | null,
    host: { name: 'Vercel Inc.', address: '440 N Barranca Ave #4133, Covina, CA 91723, USA' },
  },
} as const;

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'La boutique', href: '/la-boutique' },
  { label: 'Nos produits', href: '/nos-produits' },
  { label: 'Commandes', href: '/commandes' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Contact', href: '/contact' },
] as const;

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
