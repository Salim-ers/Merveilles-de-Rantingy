import { openingHours, hoursByDay, weekOrder, type DayHours, type Interval } from '@/data/opening-hours';

/**
 * Tout ce qui concerne les horaires affichés est calculé ici, à partir de
 * data/opening-hours.ts. Aucun jour férié n'est géré : l'information n'est pas disponible.
 */

const toMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

/** "06:30" → "6h30", "20:00" → "20h". */
export function formatTime(time: string): string {
  const h = Number(time.slice(0, 2));
  const m = time.slice(3, 5);
  return m === '00' ? `${h}h` : `${h}h${m}`;
}

export const formatInterval = (i: Interval) => `${formatTime(i.open)}–${formatTime(i.close)}`;

export const formatDay = (d: DayHours) =>
  d.intervals.length ? d.intervals.map(formatInterval).join(' · ') : 'Fermé';

/** Résumé court, ex. « 6h30–20h · fermé le jeudi ». */
export function hoursSummary(): string {
  const openDays = openingHours.filter((d) => d.intervals.length);
  const closedDays = weekOrder
    .map((n) => hoursByDay(n))
    .filter((d): d is DayHours => Boolean(d && !d.intervals.length));
  const labels = new Set(openDays.map(formatDay));
  const closed = closedDays.map((d) => d.label.toLowerCase());

  if (labels.size === 1) {
    const [label] = [...labels];
    if (!closed.length) return `${label}, 7j/7`;
    return `${label} · fermé le ${closed.join(' et le ')}`;
  }
  return closed.length ? `Fermé le ${closed.join(' et le ')}` : 'Ouvert 7j/7';
}

/** Heure locale de la boutique, indépendante du fuseau du visiteur. */
export function parisTime(now: Date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Paris',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { day: map[get('weekday')] ?? 0, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export type BusinessStatus = {
  open: boolean;
  /** Jour courant à Paris (0 = dimanche). */
  day: number;
  /** « Ouvert maintenant » / « Fermé ». */
  headline: string;
  /** « jusqu’à 20h », « ouvre à 6h30 », « réouverture vendredi à 6h30 ». */
  detail: string;
  /** Pour le hero : « Ouvert aujourd’hui · 6h30–20h » ou « Fermé aujourd’hui · … ». */
  today: string;
};

function nextOpening(day: number): string {
  for (let i = 1; i <= 7; i++) {
    const next = hoursByDay((day + i) % 7);
    const first = next?.intervals[0];
    if (next && first) {
      const when = i === 1 ? 'demain' : next.label.toLowerCase();
      return `réouverture ${when} à ${formatTime(first.open)}`;
    }
  }
  return '';
}

export function getBusinessStatus(now: Date = new Date()): BusinessStatus {
  const { day, minutes } = parisTime(now);
  const today = hoursByDay(day);
  const intervals = today?.intervals ?? [];
  const todayLabel = intervals.length
    ? `Ouvert aujourd’hui · ${intervals.map(formatInterval).join(' · ')}`
    : `Fermé aujourd’hui · ${nextOpening(day)}`;

  for (const { open, close } of intervals) {
    if (minutes < toMinutes(open)) {
      return { open: false, day, headline: 'Fermé', detail: `ouvre à ${formatTime(open)}`, today: todayLabel };
    }
    if (minutes < toMinutes(close)) {
      return { open: true, day, headline: 'Ouvert maintenant', detail: `jusqu’à ${formatTime(close)}`, today: todayLabel };
    }
  }
  return { open: false, day, headline: 'Fermé', detail: nextOpening(day), today: todayLabel };
}
