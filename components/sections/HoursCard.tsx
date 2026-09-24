'use client';

import { useEffect, useState } from 'react';
import { hoursByDay, weekOrder } from '@/data/opening-hours';
import { formatDay, getBusinessStatus, hoursSummary, type BusinessStatus } from '@/lib/business-status';
import { site } from '@/data/site';

/**
 * Les horaires, comme dans la boutique : l'écriteau accroché à la porte
 * (« Ouvert » / « Fermé ») et la liste des jours à côté.
 * Tout est rendu en HTML côté serveur ; le navigateur ajoute seulement l'état
 * de l'écriteau et le repère du jour, calculés sur l'heure de Paris.
 * Les jours fériés ne sont pas annoncés : l'information n'est pas disponible.
 */
export function HoursCard() {
  const [status, setStatus] = useState<BusinessStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getBusinessStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="ardoise" id="horaires" aria-labelledby="hours-title">
      <div className="cadre ardoise-grid">
        <div className="ardoise-side">
          <p className="kicker">Horaires</p>
          <h2 id="hours-title" className="d d-l">Quand <span className="it">passer ?</span></h2>

          <div className="ecriteau" data-state={status ? (status.open ? 'open' : 'closed') : 'unknown'} aria-live="polite">
            <span className="ecriteau-nail" aria-hidden="true" />
            {status ? (
              <>
                <p className="ecriteau-word">{status.open ? 'Ouvert' : 'Fermé'}</p>
                <p className="ecriteau-sub">{status.open ? `maintenant · ${status.detail}` : status.detail}</p>
              </>
            ) : (
              <>
                <p className="ecriteau-word">Horaires</p>
                <p className="ecriteau-sub">{hoursSummary()}</p>
              </>
            )}
          </div>

          <p className="ardoise-note">
            Horaires habituels. En cas de doute (jour férié, congés), appelez le{' '}
            <a href={site.phone.href}>{site.phone.display}</a>.
          </p>
        </div>

        <table className="ardoise-table">
          <caption className="sr">Horaires d’ouverture de la boutique</caption>
          <tbody>
            {weekOrder.map((n) => {
              const d = hoursByDay(n);
              if (!d) return null;
              const closed = d.intervals.length === 0;
              const isToday = status?.day === n;
              return (
                <tr key={n} className={`${closed ? 'is-off' : ''}${isToday ? ' is-today' : ''}`}>
                  <th scope="row">
                    {d.label}
                    {isToday && <span className="ardoise-today">aujourd’hui</span>}
                  </th>
                  <td>{closed ? 'Fermé' : formatDay(d)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
