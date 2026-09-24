import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHead } from '@/components/sections/PageHead';
import { FinaleCTA } from '@/components/sections/FinaleCTA';
import { media } from '@/data/media';
import { posts, publishedPosts } from '@/data/news';

export const metadata: Metadata = {
  title: 'Actualités',
  description: 'Nouveautés de la vitrine, commandes de fête et horaires exceptionnels d’Aux Merveilles de Rantigny.',
  alternates: { canonical: '/actualites' },
};

export default function ActualitesPage() {
  const items = publishedPosts.length > 0 ? publishedPosts : posts;
  const placeholder = publishedPosts.length === 0;

  return (
    <>
      <PageHead
        crumb="Actualités"
        title={<>Ce qui change<br /><em>en boutique.</em></>}
        lead="Nouveautés de la vitrine, périodes de fête, fermetures exceptionnelles."
      />

      <section className="sec ivory">
        <div className="shell">
          {placeholder && (
            <p className="note" style={{ marginBottom: 30 }}>
              Rubrique prête à publier. Les trois modèles ci-dessous montrent la mise en page : ils
              restent invisibles en production tant qu’aucun contenu réel n’est ajouté dans <code>data/news.ts</code>.
            </p>
          )}

          <div className="posts">
            {items.map((post, i) => {
              const img = media[post.image];
              return (
                <article className="card rise" data-d={`${i * 0.06}s`} key={post.slug}>
                  <div className="ph">
                    <Image src={img.src} alt={img.alt} width={900} height={675} sizes="(max-width:1080px) 100vw, 32vw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="bd">
                    <p style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--apricot-deep)' }}>
                      {post.category}{post.date ? ` · ${post.date}` : ''}
                    </p>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    {post.draft && <span className="draft">Modèle — non publié</span>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FinaleCTA />
    </>
  );
}
