const steps = [
  { t: 'Vous nous décrivez votre demande', p: 'Occasion, date souhaitée, nombre de personnes, vos envies.' },
  { t: 'La boutique vous rappelle', p: 'Pour voir ce qui est réalisable : format, délai, tarif.' },
  { t: 'Vous confirmez ensemble', p: 'Rien n’est lancé avant votre accord, de vive voix.' },
];

/** Les trois temps d'une commande, sur une seule ligne continue : un parcours, pas trois cartes. */
export function Steps({ tone = 'orange' }: { tone?: 'orange' | 'light' }) {
  return (
    <ol className={`path path--${tone}`} aria-label="Comment se passe une commande">
      {steps.map((s, i) => (
        <li key={s.t} data-reveal="rise" style={{ '--i': i } as React.CSSProperties}>
          <span className="path-n" aria-hidden="true">{i + 1}</span>
          <div>
            <strong>{s.t}</strong>
            <p>{s.p}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
