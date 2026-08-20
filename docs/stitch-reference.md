# Référence Stitch — Les Restanques

> **Usage :** coller ce document dans Stitch avant les prompts d’écran. Les prompts Stitch seront en anglais pour une meilleure fidélité, mais les libellés visibles dans l’interface doivent être en français. Le site public est bilingue français / anglais : prévoir un sélecteur de langue discret et conserver une structure qui fonctionne dans les deux langues.
>
> **Important :** tous les textes et libellés de ce document sont des **contenus placeholder** pour le mockup. Le mockup sera jugé sur la structure, la hiérarchie, l’expérience et le design, pas sur la qualité définitive de la rédaction. Ne pas inventer d’informations sur le bien.

## Positionnement et lieu

Les Restanques est une maison de vacances indépendante / villa entière, meublé de tourisme classé 3 étoiles, située au 8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt, dans le Luberon (Vaucluse). Elle accueille jusqu’à 6 personnes : 3 chambres, 4 lits, 2 salles de bains et 2 WC. Le village est accessible à pied à 300 m.

Éléments à valoriser sans les sur-promettre : piscine privée, vue panoramique sur le Luberon, grand jardin d’oliviers, terrasse, barbecue / plancha, Wi-Fi haut débit, parking privé, arrivée autonome par boîte à clés et équipements bébé. Le linge de maison est inclus par défaut. Le ménage est une option à 50 €. La taxe de séjour est à régler sur place. Le montant de la caution est encore à préciser : ne pas afficher de montant inventé.

Judith est l’hôte. Le ton peut être incarné et accueillant, à la première personne, sans transformer le site en plateforme hôtelière anonyme.

## Direction artistique

### Intentions

Créer une expérience **Editorial / Sunbaked / Intimate** : un carnet d’adresses de voyage élégant, organique et solaire, davantage proche d’un magazine de voyage que d’un site de réservation standard. La photographie est le cœur de l’expérience : grands formats immersifs, détails de textures (eau de la piscine, feuilles d’olivier, grain de la pierre), lumière naturelle douce de matin ou de fin d’après-midi, et traces de vie (table dressée, livre ouvert) plutôt que pièces stériles.

### Palette

- Fonds et respirations : blanc cassé, calcaire, lin.
- Texte et contrastes : anthracite profond ou vert olive très sombre, plutôt que noir pur.
- Accents : terracotta ou pierre dorée, utilisés avec retenue pour les éléments interactifs.

### Typographie et composition

- Titres : serif contrastée, élégante, légèrement classique, éditoriale.
- Corps et interface : sans-serif géométrique, neutre et très lisible.
- Mise en page : whitespace généreux, bordures très fines, asymétrie modérée, chevauchements subtils et rythme de terrasses. Éviter une grille corporate trop régulière.
- Les photos doivent respirer et rester prioritaires sur le texte.

### Anti-patterns explicites

Ne pas utiliser : violet lavande omniprésent ou clichés provençaux, bois cérusé / shabby chic, typographies manuscrites façon bistrot, symétrie d’hôtel corporate, icônes abstraites froides, CTA agressifs, glassmorphism, ombres portées excessives, illustrations 3D flat, espaces blancs aseptisés sans texture, widgets météo, flux social inexistant ou sections ajoutées par improvisation.

## Principes d’interface et composants clés

- **Mobile-first :** l’ordre des sections ci-dessous est prioritaire sur mobile ; le desktop peut composer avec l’espace mais ne doit pas réordonner arbitrairement le parcours.
- **Réservation directe :** parcours clair en 3 étapes, sans paiement en ligne immédiat. Afficher une information courte et rassurante sur le fait qu’il s’agit d’une demande confirmée ensuite.
- **Calendrier de disponibilités :** composant visuel central, sélection tactile nette, états disponibles / sélectionnés / indisponibles / blocage temporaire lisibles. Sur mobile, préférer un défilement vertical des mois plutôt qu’un calendrier à deux colonnes compact.
- **Simulateur de prix :** mise à jour dynamique après sélection des dates ; montrer le détail utile, l’option ménage à 50 € si sélectionnée et l’indication de la taxe de séjour à régler sur place, sans inventer de grille tarifaire.
- **Galerie HD :** grille asymétrique sur desktop ; swipe horizontal natif et fluide sur mobile, avec légendes discrètes et sans long texte.
- **Formulaire de demande en 3 étapes :** étapes visibles, progression rassurante, champs simples : Nom, Prénom, Email, Téléphone, Message libre, puis CTA « Envoyer ma demande ». Pas de carte bancaire, pas d’adresse postale complète ni date de naissance.
- **Bilinguisme :** interface publique FR/EN ; les écrans montrés dans Stitch utilisent des libellés français. Exemples de libellés : « Vérifier les disponibilités », « Réserver votre séjour », « Voir les tarifs et disponibilités », « Envoyer ma demande », « Valider », « Refuser », « En attente », « Validées », « Refusées ».

## Architecture de contenu — espace public

L’ordre, les types de contenu, les volumes indicatifs et les exclusions ci-dessous sont obligatoires. Ne pas ajouter de sections absentes de cette liste.

### Page : Accueil (`/`)

**Rôle :** séduire immédiatement, asseoir l’identité du lieu et rassurer pour orienter vers la réservation.

1. **Hero Header (Introduction)** — Grande photo HD (par exemple vue panoramique ou piscine), titre accrocheur, sous-titre court, CTA principal « Vérifier les disponibilités ».
2. **Mot de l’Hôte (Le Concept)** — Paragraphe court à la première personne dans la voix de Judith, avec signature ou portrait subtil.
3. **Les Atouts (Highlights)** — Liste de 3 à 4 points clés avec icônes ou petites photos : capacité 6 personnes, piscine privée, panorama du Luberon, village à 300 m.
4. **Preuve Sociale (Avis Airbnb)** — 3 à 4 citations courtes issues des meilleurs avis, avec prénoms et étoiles, sous forme de cartes statiques.
5. **Call to Action final (CTA)** — Bloc mis en valeur avec titre incitatif et bouton « Réserver votre séjour ».

**Ne pas inclure :** slider d’images défilantes, widget météo local, flux Instagram, section Actualités / Blog.

### Page : Le Gîte (`/le-gite`)

**Rôle :** détailler l’expérience de séjour et la configuration sans devenir un inventaire fastidieux.

1. **Hero Gîte** — Titre et belle photo d’ambiance de la pièce de vie.
2. **Espaces & Agencement** — Alternance asymétrique photo + bloc texte pour le RDC, puis l’Étage / Mezzanine ; permettre de comprendre les couchages (3 chambres, 6 personnes).
3. **Liste des Équipements** — Grille textuelle ou liste à puces catégorisée : Cuisine, Extérieur, Confort, Bébé.
4. **Ce qui est inclus & Options** — Liste courte et transparente : linge inclus par défaut, ménage optionnel 50 €, horaires d’arrivée / départ, taxe de séjour.
5. **Call to Action** — Bouton « Voir les tarifs et disponibilités ».

**Ne pas inclure :** inventaire complet de la vaisselle, notices d’utilisation des appareils, historique architectural de la maison.

### Page : Localisation (`/localisation`)

**Rôle :** situer précisément le gîte et valoriser son emplacement dans le Luberon.

1. **En-tête Localisation** — Titre, adresse exacte et texte court rappelant la proximité à 300 m du village de Saint-Saturnin-lès-Apt.
2. **Carte Interactive** — Google Maps pleine largeur ou encadrée, avec marqueur au 8 cours de la Liberté.
3. **Accessibilité (Comment venir)** — Bloc texte sur les gares / aéroports les plus proches, le parking privé et la boîte à clés.

**Ne pas inclure :** guide touristique complet du Vaucluse, liste exhaustive des restaurants, calculateur d’itinéraire complexe.

### Page : Galerie (`/galerie`)

**Rôle :** immerger visuellement le visiteur via une expérience fluide.

1. **Mosaïque Photos (Galerie)** — Grille asymétrique desktop ou swipe horizontal natif mobile ; photos HD avec légendes discrètes ; aucun texte long.

### Page : Réservation (`/reservation`)

**Rôle :** convertir l’intention en demande concrète, sans friction.

1. **Explication du fonctionnement** — Titre fonctionnel et 1 ou 2 phrases expliquant la demande directe sans paiement immédiat, par exemple « Sélectionnez vos dates, nous vous confirmons la disponibilité sous 24h ».
2. **Module Calendrier & Simulation** — Calendrier interactif, défilement vertical infini des mois sur mobile, affichage dynamique du prix incluant options et taxes.
3. **Formulaire de demande (3 étapes)** — Champs simples : Nom, Prénom, Email, Téléphone, Message libre ; CTA « Envoyer ma demande ».

**Ne pas inclure :** saisie de carte bancaire, champs obligatoires intrusifs (adresse postale complète, date de naissance), textes légaux interminables ; un simple lien vers les CGV suffit.

### Page : Contact (`/contact`)

1. **Informations de Contact** — Adresse e-mail `les-restanques@gmail.com` et adresse physique du gîte.
2. **Formulaire de Contact** — Nom, Email, Sujet, Message ; CTA « Envoyer ».

### Pages Légales (`/mentions-legales`, `/cgv`)

1. **Contenu Légal** — Blocs de textes structurés couvrant conditions d’annulation, mentions légales et politique de confidentialité.

## Architecture de contenu — espace admin (`/admin/*`)

Partie minimaliste, pensée pour Judith, utilisatrice non-technique. L’admin est desktop dans le script Stitch, avec une interface opérationnelle sobre et lisible.

### Page : Dashboard (`/admin/dashboard`)

1. **Liste des Demandes** — Cartes de réservations triées par statut : En attente, Validées, Refusées.
2. **Actions Rapides** — Boutons « Valider » / « Refuser » et champ texte optionnel pour ajouter un message au client.

### Page : Planning (`/admin/planning`)

1. **Calendrier Global** — Vue calendrier avec distinction visuelle des sources (Direct, Airbnb, Blocage manuel), et possibilité de cliquer sur une date pour la bloquer / débloquer.

### Page : Tarifs & Règles (`/admin/tarifs`)

1. **Gestionnaire de Saisons** — Formulaire simplifié listant les saisons Basse, Moyenne, Haute, avec champs « Prix par nuit », « Séjour minimum » et « Jours d’arrivée autorisés ».
