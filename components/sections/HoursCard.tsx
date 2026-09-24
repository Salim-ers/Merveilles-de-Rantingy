'use client';

import { useEffect, useState } from 'react';
import { openingHours, weekOrder } from '@/data/opening-hours';
import { parisTime } from '@/lib/business-status';
import { site } from '@/data/site';
import { OpenState } from '@/components/ui/OpenState';
import { Eyebrow } from '@/components/ui/Eyebrow';

/** Carte des horaires : le jeudi a sa propre couleur, pas un jour barré. */
export function HoursCard() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(parisTime().day), []);

  return (
    <section className="sec paper" id="horaires">
      <div className="shell split">
        <div>
          <Eyebrow>Horaires</Eyebrow>
          <h2 className="ti s2 rise" data-d=".05s" style={{ maxWidth: '14ch' }}>
            Six jours sur sept,<br /><em>de 6h30 à 20h.</em>
          </h2>
          <p className="lead rise" data-d=".1s" style={{ marginTop: 20 }}>
            Le pain du matin et celui du soir sont au même endroit. Le jeudi, la boutique se repose :
            c’est le seul jour où il faut aller ailleurs.
          </p>
          <p className="rise" data-d=".15s" style={{ marginTop: 24 }}><OpenState /></p>
          <div className="acts rise" data-d=".2s">
            <a className="p p--main" href={site.phone.href}>Appeler la boutique</a>
            <a className="p p--line" href={site.maps.directions} target="_blank" rel="noopener">Itinéraire</a>
          </div>
        </div>

        <div className="week grow">
          <ul>
            {weekOrder.map((day) => {
              const entry = openingHours.find((d) => d.day === day)!;
              const closed = entry.intervals.length === 0;
              return (
                <li
                  key={day}
                  data-day={day}
                  className={`${closed ? 'off' : ''}${!closed && today === day ? ' today' : ''}`}
                  suppressHydrationWarning
                >
                  <span>{entry.label}</span>
                  <b>{closed ? 'Fermé' : entry.intervals.map((i) => `${i.open} – ${i.close}`).join(' · ')}</b>
                </li>
              );
            })}
          </ul>
          <p className="week-note">Ouvert le dimanche comme le reste de la semaine, jusqu’à 20h.</p>
        </div>
      </div>
    </section>
  );
}
