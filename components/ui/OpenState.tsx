'use client';

import { useEffect, useState } from 'react';
import { getBusinessStatus, type BusinessStatus } from '@/lib/business-status';

/**
 * Statut d'ouverture calculé sur le fuseau Europe/Paris, à partir de data/opening-hours.ts.
 * Le serveur (et un navigateur sans JavaScript) affiche le résumé fixe des horaires :
 * jamais d'« ouvert » figé au moment du build.
 *
 * - variant "today" : « Ouvert aujourd’hui · 6h30–20h »
 * - variant "live"  : « Ouvert maintenant · jusqu’à 20h »
 */
export function OpenState({ variant = 'live', fallback }: { variant?: 'today' | 'live'; fallback: string }) {
  const [state, setState] = useState<BusinessStatus | null>(null);

  useEffect(() => {
    const tick = () => setState(getBusinessStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const label = !state ? fallback : variant === 'today' ? state.today : `${state.headline} · ${state.detail}`;

  return (
    <span className="state" data-state={state ? (state.open ? 'open' : 'closed') : 'unknown'}>
      <i aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
