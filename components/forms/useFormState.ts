'use client';

import { useState } from 'react';
import { site } from '@/data/site';

export type Status = 'idle' | 'loading' | 'success' | 'error';

type ApiReply = { ok: boolean; error?: string; fields?: Record<string, string> };

/**
 * Envoi progressif : le <form> poste nativement vers /api/contact sans JavaScript.
 * Avec JavaScript, l'envoi passe par fetch et les erreurs (validées par le serveur)
 * s'affichent sous chaque champ, sans recharger la page.
 */
export function useFormState() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (status === 'loading') return;

    setStatus('loading');
    setMessage('Envoi en cours…');
    setErrors({});

    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') body.append(key, value);
    });

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      const data = (await response.json().catch(() => ({ ok: false }))) as ApiReply;

      if (response.ok && data.ok) {
        setStatus('success');
        setMessage('Demande bien reçue. La boutique vous rappelle pour en parler.');
        form.reset();
        return;
      }

      setErrors(data.fields ?? {});
      setStatus('error');
      setMessage(data.error ?? `L’envoi n’a pas abouti. Appelez la boutique au ${site.phone.display}.`);

      const firstInvalid = data.fields ? Object.keys(data.fields)[0] : undefined;
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    } catch {
      setStatus('error');
      setMessage(`Connexion impossible. Vérifiez votre réseau ou appelez la boutique au ${site.phone.display}.`);
    }
  }

  return { status, message, errors, submit };
}
