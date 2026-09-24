import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHead } from '@/components/sections/PageHead';
import { ShopBand } from '@/components/sections/ShopBand';
import { FinaleCTA } from '@/components/sections/FinaleCTA';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { media } from '@/data/media';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'La boutique',
  description: 'Aux Merveilles de Rantigny : boulangerie, pâtisserie et sandwicherie avenue de Rantigny (60290). Ouvert de 6h30 à 20h, fermé le jeudi.',
  alternates: { canonical: '/la-boutique' },
};

const facts = [
  { t: 'Une adresse de passage', p: 'La boutique est installée avenue de Rantigny, derrière une devanture sombre et ses stores orange. On la repère de loin.' },
  { t: 'Ouvert tôt, fermé tard', p: 'De 6h30 à 20h : le pain du matin et celui du soir sont au même endroit, six jours sur sept.' },
  { t: 'Sucré, salé, et le reste', p: 'Pain et viennoiserie, pâtisserie et tartes, sandwichs et boissons fraîches, glaces et confiserie selon la saison.' },
];

export default function BoutiquePage() {
  return (
    <>
      <PageHead
        crumb="La boutique"
        title={<>Avenue de Rantigny,<br /><em>depuis {site.legal.since}.</em></>}
        lead="Une boulangerie-pâtisserie de quartier, ouverte six jours sur sept, du petit matin jusqu’au soir."
        image={media.facade}
      />

      <section className="sec ivory">
        <div className="shell duo">
          <div className="duo-media curtain">
            <figure className="arch" style={{ margin: 0 }}>
              <Image src={media.interieur.src} alt={media.interieur.alt} fill sizes="(max-width:1080px) 100vw, 44vw" style={{ objectFit: 'cover' }} />
            </figure>
            <figure className="round" style={{ margin: 0 }}>
              <Image src={media.painCampagne.src} alt={media.painCampagne.alt} fill sizes="220px" style={{ objectFit: 'cover' }} />
            </figure>
          </div>

          <div className="duo-body">
            <Eyebrow>La maison</Eyebrow>
            <h2 className="ti s2 rise" data-d=".05s" style={{ maxWidth: '16ch' }}>
              Ce qu’il y a derrière<br /><em>la vitrine.</em>
            </h2>
            <div className="steps rise" data-d=".1s">
              {facts.map((fact, i) => (
                <div className="step" key={fact.t}>
                  <span className="n">{i + 1}</span>
                  <div><h3>{fact.t}</h3><p>{fact.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec cream">
        <div className="shell">
          <div className="head" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Eyebrow>Activités déclarées</Eyebrow>
            <h2 className="ti s2 rise" data-d=".05s" style={{ maxWidth: '17ch' }}>Tout ce qui se vend<br /><em>au comptoir.</em></h2>
          </div>
          <ul className="rayons" style={{ gap: '12px' }}>
            {site.activities.map((activity, i) => (
              <li className="rise" data-d={`${i * 0.03}s`} key={activity}>
                <span className="badge" style={{ fontSize: '.95rem', padding: '10px 20px' }}>{activity}</span>
              </li>
            ))}
          </ul>
          <p className="lead rise" style={{ textAlign: 'center', margin: '28px auto 0' }}>
            Liste issue de l’objet social déclaré au registre du commerce. Les disponibilités réelles
            varient selon les jours et la saison.
          </p>
        </div>
      </section>

      <ShopBand />
      <FinaleCTA />
    </>
  );
}
