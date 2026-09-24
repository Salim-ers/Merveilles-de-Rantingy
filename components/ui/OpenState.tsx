'use client';

import { useEffect, useState } from 'react';
import { getBusinessStatus, type BusinessStatus } from '@/lib/business-status';

/**
 * Pastille d'ouverture, calculée sur le fuseau Europe/Paris (jeudi compris).
 * Le tableau des horaires reste en HTML : rien d'essentiel ne dépend de JS.
 */
export function OpenState() {
  const [state, setState] = useState<BusinessStatus | null>(null);

  useEffect(() => {
    const tick = () => setState(getBusinessStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="chip" data-state={state?.status ?? 'closed'} suppressHydrationWarning>
      <i aria-hidden="true" />
      <span className="chip-label">{state ? state.label : '6h30 – 20h'}</span>
    </span>
  );
}
