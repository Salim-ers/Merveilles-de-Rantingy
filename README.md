# Aux Merveilles de Rantigny — site vitrine

Site vitrine de la boulangerie-pâtisserie **Aux Merveilles de Rantigny**, avenue de Rantigny, 60290 Rantigny.
Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind · GSAP (usage volontairement restreint).

## Direction artistique — la vitrine généreuse

L'identité part de ce que vend vraiment la boutique : des pâtisseries généreuses, colorées,
brillantes. Le site est fait pour les mettre en valeur, pas pour leur voler la vedette.

| | Parti pris |
| --- | --- |
| Fond | Ivoire chaud #FBF5EC et crème, blanc cassé — le cacao #2A1A12 en respiration |
| Accent | L'orange de l'enseigne, réchauffé en abricot #E0703A, en touches (pastilles, boutons, surtitres) |
| Formes | L'arche — la vitrine, la bouche du four — et le médaillon rond. Rayons généreux, aucun angle vif |
| Typographie | Fraunces (serif souple, italique pour les respirations) + Karla |
| Hero | Trois arches alignées comme une devanture, posées sur un appui de vitrine |
| Mouvement | Lent et souple : montées de 0,7 s, ouvertures en rideau, léger rebond sur les cartes |
| Ton | Chaleureux et concret : « Une vitrine qui déborde », « On vous garde un flan ? » |

## L'accueil, section par section

1. **La devanture** — trois arches (le pain, la vitrine, les tartes) sur un appui, le nom au-dessus.
2. **Trois repères** — horaires, adresse, téléphone : l'essentiel sans faire défiler la page.
3. **Le matin** — une phrase, une photo ronde, rien d'autre.
4. **Les rayons** — rail horizontal en scroll-snap natif, sans carrousel JavaScript.
5. **Trois merveilles** — macarons géants, entremets, pièces de fête.
6. **La boutique** — grande carte photo aux angles arrondis.
7. **Les horaires**, **les avis**, **l'adresse**, puis l'appel final.

Les rayons s'appuient chacun sur une vraie photo. Les activités déclarées sans photographie (viennoiserie, glaces, confiserie,
traiteur) sont citées en une ligne sous le rail plutôt que représentées par une image d'emprunt.

Le jeudi de fermeture n'est pas barré ni traité comme un manque : il a sa propre couleur dans la
carte des horaires, avec une phrase qui l'assume.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

Le build télécharge les polices Google (Fraunces + Karla) via `next/font` : une connexion
est nécessaire au moment du build.

## Où modifier quoi

| Besoin | Fichier |
| --- | --- |
| Nom, téléphone, adresse, avis, mentions légales | `data/site.ts` |
| Horaires (tableau, statut en direct, JSON-LD) | `data/opening-hours.ts` |
| Photographies + textes alternatifs | `data/media.ts` |
| Les rayons en médaillons et le catalogue | `data/products.ts` |
| Galerie et filtres | `data/gallery.ts` |
| Actualités | `data/news.ts` |
| Couleurs, typo, espacements | variables CSS en haut de `app/globals.css` |

## Données vérifiées utilisées

Registre du commerce (SIREN 897 943 874) : SARL au capital de 1 000 €, SIRET 897 943 874 00015,
RCS Beauvais, TVA FR 14 897943874, immatriculation en 2021, NAF 1071C.
Fiche Google : téléphone 09 80 67 05 88, horaires 6h30–20h du vendredi au mercredi, fermé le jeudi,
76 avis.

## Points à arbitrer avec le client

- [ ] **Nom d’enseigne.** Le registre et la fiche Google indiquent « Aux Merveilles de Rantigny » ;
      la devanture porte « Merveilles de Ravigny ». Le site utilise le nom officiel
      (`site.name`), la graphie de la façade est notée dans `site.signboard`.
- [ ] **Numéro de voirie.** Aucune source publique ne le donne : le site affiche « Avenue de Rantigny ».
      À compléter dans `data/site.ts` dès qu’il est connu.
- [ ] **Note Google.** `site.reviews.showRating` est à `false` : seul le nombre d’avis (76) est
      affiché, avec un lien vers la fiche. La note de 3,6/5 peut être affichée en passant le
      drapeau à `true` — le JSON-LD suit automatiquement.
- [ ] **Logo officiel** (SVG) — composition typographique provisoire pour l’instant.
- [ ] **Directeur de la publication** → `site.legal.director` (mentions légales).
- [ ] **Fiche Google Business** → `site.googleBusinessUrl` (aucune URL n’a été inventée : les liens
      pointent vers une recherche Maps construite depuis l’adresse).
- [ ] **Coordonnées GPS vérifiées** → `site.geo` (absentes du JSON-LD tant qu’elles ne le sont pas).
- [ ] **Réception des formulaires** : `RESEND_API_KEY` + `CONTACT_TO_EMAIL` (voir `.env.example`).
      Sans ces variables, l’API répond franchement que l’envoi n’est pas configuré.

## Ce qui n’a pas été écrit

Aucun prix, aucun témoignage, aucune récompense, aucun label, aucune ancienneté inventée, aucune
recette, aucun nom d’artisan, aucune livraison ni commande en ligne. Le formulaire de commande est
explicitement présenté comme une demande, confirmée par la boutique.

## Accessibilité & performance

- Navigation clavier complète, focus orange épais, formulaires labellisés avec erreurs explicites.
- `prefers-reduced-motion` : flottements et rideaux neutralisés, révélations instantanées.
- Le tableau des horaires est rendu en HTML côté serveur ; JavaScript n’ajoute que le surlignage
  du jour et le statut « ouvert / fermé ».
- Images en AVIF/WebP via `next/image`, chargement différé hors hero.
- GSAP est importé dynamiquement et ne sert qu’au bandeau : il ne pèse pas sur le bundle initial.
