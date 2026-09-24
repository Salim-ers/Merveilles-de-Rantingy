# Aux Merveilles de Rantigny — site de la boutique

Boulangerie-pâtisserie-sandwicherie, avenue de Rantigny, 60290 Rantigny.
Next.js 15 (App Router) · React 19 · TypeScript strict · CSS écrit à la main · Zod. Aucune autre dépendance.

## Direction artistique : « la vitrine spectacle »

Le site doit donner faim et donner envie de passer en boutique. Les produits sont les héros ;
l'interface reste en charbon, ivoire et orange (la façade), les couleurs vives viennent des pâtisseries.

| | Parti pris |
| --- | --- |
| Couleurs | Charbon `#1B1714`, noir `#141110`, ivoire `#F6EEE1`, crème, orange façade `#E4611B` |
| Typographie | **Anton** (enseigne, étiquettes, titres) · **Instrument Serif** italique (la gourmandise) · **Archivo** (texte) |
| Signature | Les titres posés sur des **bandeaux pleins** qui chevauchent les photos, comme des étiquettes de vitrine |
| Formes | Angles francs, ombres portées pleines (fiche de commande, dock mobile), aucun arrondi |
| Mouvement | Rideau de fer (la photo se découvre du bas), titres dévoilés au masque, dérive des grandes photos au défilement (CSS pur), mosaïque décalée. Tout disparaît avec `prefers-reduced-motion`. |

### L'accueil

1. **Hero collage** — grande photo de l'entremets miroir, deux photos verticales, le nom en bandeaux, les métiers le long d'un montant noir.
2. **Les merveilles** — quatre pièces signature, quatre mises en page (pleine largeur, nom vertical, photo débordée…).
3. **Rayon par rayon** — signalétique des 7 rayons ; au survol/focus, la photo du rayon s'affiche (CSS `:has`, sans JS).
4. **La vitrine du jour** — mosaïque éditoriale sur grille 12 colonnes, visionneuse accessible (`<dialog>`).
5. **Une occasion à fêter ?** — section orange, parcours en 3 temps sur une ligne continue.
6. **Poussez la porte** — intérieur, façade, filet orange traversant.
7. **Horaires** — l'écriteau « Ouvert / Fermé » accroché à la porte + la liste des jours, jeudi en orange.

Pied de page : le store orange festonné porte le numéro de téléphone.
Mobile : étiquette flottante (Appeler · Itinéraire · La carte) ; « la carte » est un volet de vignettes photo (API Popover native).

### Différenciation avec « Le Duo d'Artisans »

Vérifiée point par point avec le code du Duo (`../le-duo-artisans`) : aucune police commune
(le Duo : Newsreader + Hanken Grotesk), pas de nom de classe ni de variable CSS partagés pour les
composants principaux, et des compositions différentes pour le hero, la galerie (grille explicite ici,
colonnes chez le Duo), les horaires (écriteau ici, grand mot chez le Duo), le pied de page (store + téléphone
ici, grande signature chez le Duo), la barre mobile (étiquette flottante 3 actions ici, barre pleine largeur
chez le Duo) et le menu mobile (vignettes photo ici, liste numérotée plein écran chez le Duo).

## Démarrer

```bash
npm install
npm run dev            # http://localhost:3000
npm run check:assets   # audit des images
npm run build          # lance d'abord check:assets (prebuild)
npm run typecheck
```

## Où modifier quoi

| Besoin | Fichier |
| --- | --- |
| Nom, téléphone, adresse, mentions légales | `data/site.ts` |
| Horaires (liste, statut en direct, JSON-LD) | `data/opening-hours.ts` |
| Photos + textes alternatifs + dimensions | `data/media.ts` |
| Rayons et catalogue | `data/products.ts` |
| Mosaïque « La vitrine du jour » | `data/gallery.ts` |
| Actualités (vide = page masquée) | `data/news.ts` |
| Navigation | `data/navigation.ts` |
| Couleurs, typo, espacements | variables en tête de `app/globals.css` |

## Images

Toutes les photos sont dans `public/images` (aucun lien vers Google, Instagram ou un autre site).
`scripts/check-assets.mjs` s'exécute avant chaque build et **bloque** si une image référencée manque,
si la casse du chemin diffère du fichier (Vercel est sensible à la casse), si le format réel ne correspond
pas à l'extension, si les dimensions déclarées dans `data/media.ts` sont fausses, ou si une image distante
est utilisée.

Audit au moment de la refonte :

| Fichier | Format | Dimensions | Poids | Usage |
| --- | --- | --- | --- | --- |
| boutique/…-facade.webp | WebP | 1254×1254 | 224 Ko | Poussez la porte, mosaïque, carte mobile, OG contact |
| boutique/…-interieur-boutique.webp | WebP | 1254×1254 | 159 Ko | Poussez la porte, rayons Salé/Boissons, OG boutique |
| boulangerie/…-pain-de-campagne.webp | WebP | 1254×1254 | 326 Ko | Hero, rayons, catalogue |
| patisserie/…-entremets-fruits.webp | WebP | 1254×1254 | 133 Ko | **Hero (LCP)**, mosaïque, OG accueil |
| patisserie/…-eclairs-vitrine.webp | WebP | 1254×1254 | 147 Ko | Hero, catalogue, mosaïque |
| patisserie/…-eclairs-fraises.webp | WebP | 1254×1254 | 164 Ko | Non affichée : quasi-doublon de la précédente |
| patisserie/…-macarons-fraises.webp | WebP | 1254×1254 | 191 Ko | Les merveilles, catalogue, OG vitrine |
| patisserie/…-entremets-individuels.webp | WebP | 1122×1402 | 110 Ko | Les merveilles, catalogue |
| patisserie/…-flans-patissiers.webp | WebP | 1254×1254 | 172 Ko | Les merveilles (recadrée en haut : le bas montre le meuble) |
| patisserie/…-tarte-aux-pommes.webp | WebP | 1254×1254 | 175 Ko | Les merveilles, rayons, 404 |
| gateaux/…-gateaux-coeur.webp | WebP | 1254×1254 | 208 Ko | Section occasion, commandes, OG commandes |

Les fichiers sont nets et bien chargés ; leur limite est la **définition** (1254 px). Sur un écran
Retina large, la photo du hero est affichée au maximum de sa résolution : pour un rendu parfait,
fournir des originaux d'au moins 2400 px de large. `next/image` sert de l'AVIF/WebP aux bonnes tailles,
charge en priorité la seule image LCP et ne dépasse jamais la taille d'origine (aucun étirement).

## Formulaires & sécurité

- Les formulaires postent vers `/api/contact` et **fonctionnent sans JavaScript** (redirection vers
  `/demande-envoyee` ou `/demande-non-envoyee`) ; avec JavaScript, les erreurs s'affichent sous chaque champ.
- Validation **serveur** Zod (`lib/validation.ts`) : longueurs, e-mail, téléphone FR/international,
  date (aujourd'hui → +12 mois, fuseau Paris), nombre de personnes (1–300), listes fermées.
- Honeypot, limitation de débit (5 envois / 10 min / IP, en mémoire : protection « best effort »
  sur Vercel — brancher Upstash dans `lib/rate-limit.ts` pour une limite globale), contrôle d'origine,
  corps limité à 16 Ko, Turnstile optionnel.
- Messages d'erreur génériques côté navigateur ; journaux serveur sans donnée personnelle.
- **Pas d'envoi de photo d'inspiration** : aucun stockage sécurisé n'est configuré. À ajouter seulement
  avec un stockage dédié (MIME vérifié côté serveur, 5 Mo max, JPEG/PNG/WebP, nom généré, métadonnées nettoyées).
- En-têtes : CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
  `frame-ancestors 'none'` / `X-Frame-Options`, COOP (`next.config.mjs`). La CSP garde
  `'unsafe-inline'` pour les scripts d'hydratation de Next sur pages statiques.
- Aucun cookie, aucune mesure d'audience, aucune carte tierce : pas de bandeau de consentement.

Variables d'environnement : voir `.env.example`. **Tant que `RESEND_API_KEY`, `CONTACT_TO_EMAIL` et
`CONTACT_FROM_EMAIL` ne sont pas définies, les demandes ne partent pas** : le visiteur est invité à appeler.

## Points à confirmer avec la boutique

Ces informations ne sont **pas** affichées tant qu'elles ne sont pas confirmées.

- [ ] **Numéro de voirie** : aucune source fiable ; le site affiche « Avenue de Rantigny ». Ne jamais en inventer un.
- [ ] **Logo officiel** (SVG) : le site utilise une composition typographique.
- [ ] **Nom d'enseigne** : registre et fiche Google « Aux Merveilles de Rantigny », façade « Merveilles de Ravigny » (`site.signboard`).
- [ ] **Directeur de la publication** → `site.legal.director` (à défaut : « le gérant de la société »).
- [ ] **Coordonnées GPS** vérifiées → `site.geo` (absentes du JSON-LD sinon).
- [ ] **Adresse e-mail** de la boutique → `site.email`.
- [ ] **Produits** : viennoiseries et boissons n'ont pas de photo ; aucun prix, ingrédient ni allergène n'est publié.
- [ ] **Jours fériés / congés** : non gérés (l'information n'existe pas) ; le site invite à appeler en cas de doute.
- [ ] **Actualités** : ajouter de vraies publications dans `data/news.ts` pour faire apparaître la rubrique.
- [ ] **Photos haute définition** (≥ 2400 px) pour le hero et les grandes compositions.

## Fichiers obsolètes

Ces fichiers de l'ancienne version ne sont plus importés ni compilés (exclus dans `tsconfig.json`) et
peuvent être supprimés : `tailwind.config.ts`, `components/sections/HoursStrip.tsx`,
`components/sections/MatinIntro.tsx`, `components/sections/QuickFacts.tsx`,
`components/sections/ReviewsBlock.tsx`, `components/ui/Eyebrow.tsx`.
