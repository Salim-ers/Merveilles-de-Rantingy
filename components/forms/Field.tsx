import { cloneElement } from 'react';
import Link from 'next/link';
import { Turnstile } from './Turnstile';

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  full?: boolean;
  children: React.ReactElement<Record<string, unknown>>;
};

/** Ligne de la fiche : étiquette, champ souligné, aide et erreur reliées au champ. */
export function Field({ id, label, error, required, hint, full, children }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;
  const control = cloneElement(children, {
    id,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  });

  return (
    <div className={`fld${full ? ' fld--full' : ''}`} data-invalid={error ? 'true' : undefined}>
      <label htmlFor={id}>
        {label}
        {required ? <span className="req" aria-hidden="true"> *</span> : <span className="opt"> (facultatif)</span>}
      </label>
      {control}
      {hint && <p className="fld-hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="fld-err" id={`${id}-err`}>{error}</p>}
    </div>
  );
}

/** Champ piège invisible pour les robots. */
export function Honeypot() {
  return (
    <div className="miel" aria-hidden="true">
      <label>
        Ne pas remplir ce champ
        <input type="text" name="site_web" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/** Messages d'état, notice de confidentialité et bouton d'envoi, communs aux deux fiches. */
export function FormFoot({
  status,
  message,
  submitLabel,
  privacy,
}: {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  submitLabel: string;
  privacy: string;
}) {
  return (
    <div className="fiche-foot">
      <Turnstile />
      <p className={`fiche-msg${status === 'success' ? ' is-ok' : status === 'error' ? ' is-ko' : ''}`} role="status" aria-live="polite">
        {status === 'idle' ? '' : message}
      </p>
      <button className="cta cta--orange cta--block" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Envoi…' : submitLabel}
      </button>
      <p className="fiche-privacy">
        {privacy} Elles ne sont ni revendues ni utilisées à des fins commerciales.{' '}
        <Link href="/politique-confidentialite">Politique de confidentialité</Link>.
      </p>
    </div>
  );
}
