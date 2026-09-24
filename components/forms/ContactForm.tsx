'use client';

import { contactSchema } from '@/lib/validation';
import { useFormState } from './useFormState';
import { Arrow } from '@/components/ui/Arrow';

export function ContactForm() {
  const { status, message, errors, submit } = useFormState(contactSchema, '/api/contact');

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="f" data-invalid={Boolean(errors.prenom)}>
        <label htmlFor="c-prenom">Prénom <i>*</i></label>
        <input id="c-prenom" name="prenom" autoComplete="given-name" /><span className="e">{errors.prenom}</span>
      </div>
      <div className="f" data-invalid={Boolean(errors.nom)}>
        <label htmlFor="c-nom">Nom <i>*</i></label>
        <input id="c-nom" name="nom" autoComplete="family-name" /><span className="e">{errors.nom}</span>
      </div>
      <div className="f" data-invalid={Boolean(errors.telephone)}>
        <label htmlFor="c-tel">Téléphone</label>
        <input id="c-tel" name="telephone" type="tel" autoComplete="tel" /><span className="e">{errors.telephone}</span>
      </div>
      <div className="f" data-invalid={Boolean(errors.email)}>
        <label htmlFor="c-email">E-mail <i>*</i></label>
        <input id="c-email" name="email" type="email" autoComplete="email" /><span className="e">{errors.email}</span>
      </div>
      <div className="f full" data-invalid={Boolean(errors.sujet)}>
        <label htmlFor="c-sujet">Sujet <i>*</i></label>
        <input id="c-sujet" name="sujet" /><span className="e">{errors.sujet}</span>
      </div>
      <div className="f full" data-invalid={Boolean(errors.message)}>
        <label htmlFor="c-message">Message <i>*</i></label>
        <textarea id="c-message" name="message" /><span className="e">{errors.message}</span>
      </div>

      <p className="note">Pour une réponse tout de suite, le téléphone reste le plus efficace : 09 80 67 05 88.</p>
      {status !== 'idle' && (
        <p className={`msg ${status === 'success' ? 'ok' : status === 'error' ? 'ko' : ''}`} role="status" aria-live="polite">
          {message}
        </p>
      )}
      <div className="f full">
        <button className="p p--main" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Envoi…' : 'Envoyer'}<Arrow />
        </button>
      </div>
    </form>
  );
}
