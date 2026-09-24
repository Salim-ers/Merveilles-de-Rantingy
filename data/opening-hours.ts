/** Horaires officiels (fiche Google de l'établissement). Fermeture le jeudi. */
export type Interval = { open: string; close: string };
export type DayHours = { day: number; label: string; short: string; intervals: Interval[] };

const WIDE = [{ open: '06:30', close: '20:00' }];

export const openingHours: DayHours[] = [
  { day: 1, label: 'Lundi', short: 'Lun', intervals: WIDE },
  { day: 2, label: 'Mardi', short: 'Mar', intervals: WIDE },
  { day: 3, label: 'Mercredi', short: 'Mer', intervals: WIDE },
  { day: 4, label: 'Jeudi', short: 'Jeu', intervals: [] },
  { day: 5, label: 'Vendredi', short: 'Ven', intervals: WIDE },
  { day: 6, label: 'Samedi', short: 'Sam', intervals: WIDE },
  { day: 0, label: 'Dimanche', short: 'Dim', intervals: WIDE },
];

/** Ordre d'affichage du tableau : lundi → dimanche. */
export const weekOrder = [1, 2, 3, 4, 5, 6, 0];
export const hoursByDay = (day: number) => openingHours.find((d) => d.day === day);
