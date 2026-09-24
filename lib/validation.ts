import { z } from 'zod';
import { CREATIONS, OCCASIONS, parisToday } from './form-options';

/**
 * Schémas de validation SERVEUR (app/api/contact/route.ts).
 * Les attributs HTML (required, maxlength…) ne sont qu'un confort côté navigateur.
 */

const NAME = /^[\p{L}][\p{L}\p{M}\s'’.-]*$/u;

const name = (label: string, max: number) =>
  z
    .string({ required_error: `Indiquez votre ${label}.` })
    .trim()
    .min(1, `Indiquez votre ${label}.`)
    .max(max, `${label[0]!.toUpperCase()}${label.slice(1)} trop long.`)
    .regex(NAME, `${label[0]!.toUpperCase()}${label.slice(1)} invalide.`);

/** Numéro français (01…09, +33, 0033) ou international au format E.164. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/[\s.()-]/g, '');
  return /^(?:\+33|0033|0)[1-9]\d{8}$/.test(digits) || /^\+[1-9]\d{7,14}$/.test(digits);
}

const phone = z
  .string({ required_error: 'Indiquez un numéro de téléphone.' })
  .trim()
  .min(1, 'Indiquez un numéro de téléphone.')
  .max(25, 'Numéro de téléphone invalide.')
  .refine(isValidPhone, 'Numéro de téléphone invalide.');

const email = z.string().trim().max(254, 'Adresse e-mail trop longue.').email('Adresse e-mail invalide.');

const optionalEmail = z
  .string()
  .trim()
  .max(254, 'Adresse e-mail trop longue.')
  .refine((v) => v === '' || z.string().email().safeParse(v).success, 'Adresse e-mail invalide.')
  .optional()
  .transform((v) => v || undefined);

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const desiredDate = z
  .string({ required_error: 'Indiquez la date souhaitée.' })
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Indiquez la date souhaitée.')
  .refine((v) => {
    const d = new Date(`${v}T12:00:00Z`);
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
  }, 'Date invalide.')
  .refine((v) => v >= parisToday(), 'La date doit être aujourd’hui ou plus tard.')
  .refine((v) => v <= addDays(parisToday(), 365), 'Choisissez une date dans les douze prochains mois.');

const message = (min: number) =>
  z
    .string({ required_error: 'Écrivez quelques mots.' })
    .trim()
    .min(min, 'Décrivez votre demande en quelques mots.')
    .max(2000, 'Message trop long (2 000 caractères maximum).');

export const orderSchema = z.object({
  prenom: name('prénom', 60),
  nom: name('nom', 80),
  telephone: phone,
  email: optionalEmail,
  date: desiredDate,
  personnes: z.coerce
    .number({ invalid_type_error: 'Indiquez un nombre de personnes.' })
    .int('Indiquez un nombre entier.')
    .min(1, 'Indiquez un nombre de personnes (1 à 300).')
    .max(300, 'Au-delà de 300 personnes, appelez directement la boutique.'),
  occasion: z.enum(OCCASIONS, { errorMap: () => ({ message: 'Choisissez un type d’occasion.' }) }),
  creation: z.enum(CREATIONS, { errorMap: () => ({ message: 'Choisissez un type de création.' }) }),
  message: message(10),
});

export const contactSchema = z.object({
  prenom: name('prénom', 60),
  nom: name('nom', 80),
  email,
  telephone: z
    .string()
    .trim()
    .max(25, 'Numéro de téléphone invalide.')
    .refine((v) => v === '' || isValidPhone(v), 'Numéro de téléphone invalide.')
    .optional()
    .transform((v) => v || undefined),
  message: message(10),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

/** Première erreur par champ, pour l'affichage sous chaque champ. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
