'use client';

import { orderSchema } from '@/lib/validation';
import { useFormState } from './useFormState';
import { Arrow } from '@/components/ui/Arrow';

export function OrderForm() {
  const { status, message, errors, submit } = useFormState(orderSchema, '/api/contact');

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="f" data-invalid={Boolean(errors.prenom)}>
        <label htmlFor="prenom">Prénom <i>*</i></label>
        <input id="prenom" name="prenom" autoComplete="given-name" />
        <span className="e">{errors.prenom}</span>
      </div>
      <div className="f" data-invalid={Boolean(errors.nom)}>
        <label htmlFor="nom">Nom <i>*</i></label>
        <input id="nom" name="nom" autoComplete="family-name" />
        <span className="e">{errors.nom}</span>
      </div>
      <div className="f" data-invalid={Boolean(errors.telephone)}>
        <label htmlFor="telephone">Téléphone <i>*</i></label>
        <input id="telephone" name="telephone" type="tel" autoComplete="tel" />
        <span className="e">{errors.telephone}</span>
      </div>
      <div className="f" data-invalid={Boolean(errors.email)}>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" />
        <span className="e">{errors.email}</span>
      </div>
      <div className="f">
        <label htmlFor="type">Type de demande</label>
        <select id="type" name="type" defaultValue="Anniversaire">
          <option>Anniversaire</option><option>Événement</option><option>Gâteau</option>
          <option>Traiteur</option><option>Autre</option>
        </select>
      </div>
      <div className="f">
        <label htmlFor="date">Date souhaitée</label>
        <input id="date" name="date" type="date" />
      </div>
      <div className="f">
        <label htmlFor="personnes">Nombre de personnes</label>
        <input id="personnes" name="personnes" type="number" min={1} inputMode="numeric" />
      </div>
      <div className="f full" data-invalid={Boolean(errors.message)}>
        <label htmlFor="message">Message <i>*</i></label>
        <textarea id="message" name="message" />
        <span className="e">{errors.message}</span>
      </div>

      <p className="note">
        Ce formulaire n’est pas une commande ferme : elle est confirmée par la boutique, par téléphone,
        avec le format, le délai et le prix.
      </p>
      {status !== 'idle' && (
        <p className={`msg ${status === 'success' ? 'ok' : status === 'error' ? 'ko' : ''}`} role="status" aria-live="polite">
          {message}
        </p>
      )}
      <div className="f full">
        <button className="p p--main" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Envoi…' : 'Envoyer la demande'}<Arrow />
        </button>
      </div>
    </form>
  );
}
