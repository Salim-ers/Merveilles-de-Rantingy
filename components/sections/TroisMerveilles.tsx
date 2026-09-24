import Image from 'next/image';
import { media, type MediaKey } from '@/data/media';
import { Eyebrow } from '@/components/ui/Eyebrow';

const trio: { key: MediaKey; title: string; text: string; tag: string; d?: string }[] = [
  { key: 'macarons', title: 'Les macarons géants', tag: 'En vitrine',
    text: 'Coque rose, crème et fraises entières. On les tient à deux mains.' },
  { key: 'entremetsFruits', title: 'Les entremets', tag: 'En vitrine', d: '.07s',
    text: 'Glaçage miroir, fruits frais et macarons posés dessus.' },
  { key: 'coeurs', title: 'Les pièces de fête', tag: 'Sur commande', d: '.14s',
    text: 'Cœurs, red velvet, gâteaux d’anniversaire. À commander à l’avance.' },
];

export function TroisMerveilles() {
  return (
    <section className="sec cream">
      <div className="shell">
        <div className="head" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Eyebrow>Nos merveilles</Eyebrow>
          <h2 className="ti s2 rise" data-d=".05s" style={{ maxWidth: '16ch' }}>
            On aime bien<br /><em>faire les choses en grand.</em>
          </h2>
          <p className="lead rise" data-d=".1s" style={{ textAlign: 'center', marginTop: 14 }}>
            Ici, une pâtisserie doit se voir depuis le trottoir.
          </p>
        </div>

        <div className="trio">
          {trio.map((item) => {
            const img = media[item.key];
            return (
              <article className="rise" data-d={item.d} key={item.key}>
                <figure className="arch" style={{ margin: 0 }}>
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width:760px) 100vw, 32vw" style={{ objectFit: 'cover' }} />
                </figure>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="tag">{item.tag}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
