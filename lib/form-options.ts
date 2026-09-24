/**
 * Valeurs partagées entre les formulaires (navigateur) et la validation serveur.
 * Ce module n'importe pas Zod : il peut être chargé côté client sans alourdir le bundle.
 */

export const OCCASIONS = [
  'Anniversaire',
  'Fête de famille',
  'Baptême ou communion',
  'Événement professionnel',
  'Autre occasion',
] as const;

export const CREATIONS = [
  'Gâteau d’anniversaire',
  'Entremets à partager',
  'Flan ou tarte à partager',
  'Assortiment de pâtisseries',
  'Je ne sais pas encore',
] as const;

/** Date du jour à Paris, au format AAAA-MM-JJ. */
export function parisToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(now);
}
