'use client';

import { Field, FormFoot, Honeypot } from './Field';
import { useFormState } from './useFormState';

/** Message libre à la boutique. Pour une commande de gâteau, la fiche dédiée est sur /commandes. */
export function ContactForm() {
  const { status, message, errors, submit } = useFormState();

  return (
    <form className="fiche fiche--short" method="post" action="/api/contact" onSubmit={submit}>
      <input type="hidden" name="formulaire" value="contact" />
      <Honeypot />

      <div className="fiche-head">
        <p className="fiche-k">Message</p>
        <p className="fiche-t">À la boutique</p>
        <p className="fiche-req"><span aria-hidden="true">*</span> champ obligatoire</p>
      </div>

      <fieldset className="fiche-part">
        <legend className="sr">Vos coordonnées et votre message</legend>
        <Field id="c-prenom" label="Prénom" required error={errors.prenom}>
          <input name="prenom" autoComplete="given-name" maxLength={60} />
        </Field>
        <Field id="c-nom" label="Nom" required error={errors.nom}>
          <input name="nom" autoComplete="family-name" maxLength={80} />
        </Field>
        <Field id="c-email" label="E-mail" required error={errors.email}>
          <input name="email" type="email" autoComplete="email" maxLength={254} />
        </Field>
        <Field id="c-tel" label="Téléphone" error={errors.telephone}>
          <input name="telephone" type="tel" autoComplete="tel" inputMode="tel" maxLength={25} />
        </Field>
        <Field id="c-message" label="Message" required error={errors.message} full>
          <textarea name="message" rows={5} minLength={10} maxLength={2000} />
        </Field>
      </fieldset>

      <FormFoot
        status={status}
        message={message}
        submitLabel="Envoyer le message"
        privacy="Vos coordonnées servent uniquement à vous répondre."
      />
    </form>
  );
}
