import Image from 'next/image';
import type { Media } from '@/data/media';

/** En-tête de page : centré, sur ivoire, avec une bande photo arrondie facultative. */
export function PageHead({
  crumb, title, lead, image,
}: { crumb: string; title: React.ReactNode; lead?: string; image?: Media }) {
  return (
    <section className="phead">
      <div className="shell">
        <p className="crumb">{crumb}</p>
        <h1 className="ti s1 rise">{title}</h1>
        {lead && <p className="lead rise" data-d=".06s">{lead}</p>}
        {image && (
          <figure className="phead-media curtain" data-d=".1s" style={{ margin: 0, position: 'relative' }}>
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
          </figure>
        )}
      </div>
    </section>
  );
}
