'use client';

import { useEffect, useState } from 'react';
import { CREATIONS, OCCASIONS, parisToday } from '@/lib/form-options';
import { Field, FormFoot, Honeypot } from './Field';
import { useFormState } from './useFormState';

/**
 * La fiche de demande de gâteau. Pas d'envoi de photo : aucune infrastructure
 * de stockage sécurisée n'est configurée (voir README).
 */
export function OrderForm() {
  const { status, message, errors, submit } = useFormState();
  const [minDate, setMinDate] = useState<string | undefined>();

  useEffect(() => setMinDate(parisToday()), []);

  return (
    <form className="fiche" id="fiche" method="post" action="/api/contact" onSubmit={submit}>
      <input type="hidden" name="formulaire" value="commande" />
      <Honeypot />

      <div className="fiche-head">
        <p className="fiche-k">Fiche de demande</p>
        <p className="fiche-t">Gâteaux &amp; occasions</p>
        <p className="fiche-req"><span aria-hidden="true">*</span> champ obligatoire</p>
      </div>

      <fieldset className="fiche-part">
        <legend><span>A</span> Vous</legend>
        <Field id="o-prenom" label="Prénom" required error={errors.prenom}>
          <input name="prenom" autoComplete="given-name" maxLength={60} />
        </Field>
        <Field id="o-nom" label="Nom" required error={errors.nom}>
          <input name="nom" autoComplete="family-name" maxLength={80} />
        </Field>
        <Field id="o-tel" label="Téléphone" required error={errors.telephone} hint="La boutique vous rappelle à ce numéro.">
          <input name="telephone" type="tel" autoComplete="tel" inputMode="tel" maxLength={25} />
        </Field>
        <Field id="o-email" label="E-mail" error={errors.email}>
          <input name="email" type="email" autoComplete="email" maxLength={254} />
        </Field>
      </fieldset>

      <fieldset className="fiche-part">
        <legend><span>B</span> L’occasion</legend>
        <Field id="o-date" label="Date souhaitée" required error={errors.date}>
          <input name="date" type="date" min={minDate} />
        </Field>
        <Field id="o-pers" label="Nombre de personnes" required error={errors.personnes}>
          <input name="personnes" type="number" min={1} max={300} step={1} inputMode="numeric" />
        </Field>
        <Field id="o-occasion" label="Type d’occasion" required error={errors.occasion} full>
          <select name="occasion" defaultValue="">
            <option value="" disabled>Choisir…</option>
            {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </fieldset>

      <fieldset className="fiche-part">
        <legend><span>C</span> La création</legend>
        <Field id="o-creation" label="Type de création" required error={errors.creation} full>
          <select name="creation" defaultValue="">
            <option value="" disabled>Choisir…</option>
            {CREATIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field
          id="o-message"
          label="Votre demande"
          required
          error={errors.message}
          full
          hint="Parfums, couleurs, inscription souhaitée, contraintes… La boutique vous dira ce qui est réalisable."
        >
          <textarea name="message" rows={5} minLength={10} maxLength={2000} />
        </Field>
      </fieldset>

      <p className="fiche-warn">
        L’envoi de cette demande ne constitue pas une commande confirmée. La boutique vous rappelle pour
        confirmer disponibilité, format et tarif.
      </p>

      <FormFoot
        status={status}
        message={message}
        submitLabel="Envoyer ma demande"
        privacy="Vos coordonnées servent uniquement à vous rappeler au sujet de cette demande."
      />
    </form>
  );
}
