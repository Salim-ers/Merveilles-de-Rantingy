import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHead } from '@/components/sections/PageHead';
import { Photo } from '@/components/ui/Photo';
import { posts, hasNews } from '@/data/news';

export const metadata: Metadata = {
  title: 'Saison & actualités',
  description: 'Les nouveautés, les périodes de fête et les horaires exceptionnels d’Aux Merveilles de Rantigny.',
  alternates: { canonical: '/actualites' },
};

const frDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' })
    .format(new Date(`${iso}T12:00:00Z`));

/** N'existe que si data/news.ts contient au moins une publication réelle. */
export default function ActualitesPage() {
  if (!hasNews) notFound();

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHead kicker="Saison & actualités" title={<>Ce qui change <span className="it">en boutique</span></>} />
      <section className="news">
        <div className="cadre news-list">
          {sorted.map((post) => (
            <article className={`news-item${post.image ? '' : ' news-item--type'}`} key={post.slug} id={post.slug}>
              {post.image && <Photo k={post.image} sizes="(max-width: 900px) 100vw, 40vw" />}
              <div>
                <p className="kicker">{post.category} · <time dateTime={post.date}>{frDate(post.date)}</time></p>
                <h2 className="d d-m">{post.title}</h2>
                <p>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
