import { Photo } from '@/components/ui/Photo';
import type { MediaKey } from '@/data/media';

type Props = {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: MediaKey;
  pos?: string;
};

/**
 * En-tête des pages intérieures : titre sur bandeau, photo rapprochée qui déborde à droite.
 * La photo est l'élément LCP : chargée en priorité.
 */
export function PageHead({ kicker, title, lead, image, pos }: Props) {
  return (
    <header className={`phead${image ? '' : ' phead--plain'}`}>
      <div className="cadre phead-grid">
        <div className="phead-text">
          <p className="kicker">{kicker}</p>
          <h1 className="d d-xl phead-title">{title}</h1>
          {lead && <p className="phead-lead">{lead}</p>}
        </div>
        {image && (
          <div className="phead-media">
            <Photo k={image} pos={pos} sizes="(max-width: 900px) 100vw, 50vw" priority quality={80} />
          </div>
        )}
      </div>
    </header>
  );
}
