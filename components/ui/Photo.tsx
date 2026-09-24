import Image from 'next/image';
import { media, type MediaKey } from '@/data/media';

type Props = {
  k: MediaKey;
  /** Attribut sizes de next/image : à ajuster à la largeur réelle d'affichage. */
  sizes: string;
  className?: string;
  priority?: boolean;
  pos?: string;
  /** Texte alternatif spécifique ; sinon celui de data/media.ts. */
  alt?: string;
  /** Image purement décorative (déjà décrite à côté). */
  decorative?: boolean;
  quality?: 72 | 80;
  children?: React.ReactNode;
};

/**
 * Cadre photo à recadrage fixe (le ratio vient du CSS du parent).
 * Fond et texte alternatif stylés : si le fichier ne charge pas, le cadre
 * reste propre et lisible au lieu d'afficher une icône cassée.
 */
export function Photo({ k, sizes, className, priority, pos, alt, decorative, quality = 72, children }: Props) {
  const m = media[k];
  return (
    <figure className={`ph${className ? ` ${className}` : ''}`}>
      <Image
        src={m.src}
        alt={decorative ? '' : (alt ?? m.alt)}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? 'high' : undefined}
        quality={quality}
        style={{ objectFit: 'cover', objectPosition: pos ?? m.pos ?? '50% 50%' }}
      />
      {children}
    </figure>
  );
}
