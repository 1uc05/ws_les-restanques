# Spécifications Techniques & Architecture — Site Web Gîte "Les Restanques"

Version : v1.0 (Finalisée)  
Date : 19 Août 2026  
Statut : Prêt pour développement  

---

## 1. Résumé de l'architecture

Le site "Les Restanques" repose sur une architecture JAMstack moderne et ultra-légère basée sur Next.js (App Router) et TypeScript. La partie publique est générée de manière hybride (SSG/ISR) pour offrir d'excellentes performances SEO local, tandis que la partie administration et le moteur de réservation s'appuient sur Supabase (PostgreSQL, Auth, Edge Functions) pour la gestion dynamique des données et des synchronisations iCal.

---

## 2. Stack technique retenue

| Composant | Technologie | Justification |
| :--- | :--- | :--- |
| **Framework Web** | Next.js 14+ (React / TypeScript) | Offre d'excellentes performances SEO (SSG/ISR), une intégration native des API Routes et une compatibilité optimale avec les assistants de dev IA. |
| **Styling & UI** | Tailwind CSS + Shadcn UI | Permet de construire rapidement une interface élégante, responsive et accessible sans réinventer des composants UI complexes. |
| **Base de données & Auth** | Supabase (PostgreSQL) | Fournit une base de données relationnelle robuste, une authentification intégrée simple pour Judith et un coût gratuit en V1. |
| **E-mails transactionnels** | Resend (avec React Email) | Garantit un taux de délivrabilité maximal avec une gestion propre des templates de mails bilingues (FR/EN) en code. |
| **Gestion iCal** | node-ical / ical-generator | Librairies légères et éprouvées pour l'import/parsing et l'export des flux iCal avec Airbnb. |
| **Hébergement & Domaine** | o2switch (Node.js via Phusion Passenger) | Hébergeur français retenu pour le nom de domaine `les-restanques-gite.fr`, offrant un support complet pour les applications Node.js / Next.js. |

---

## 3. Schéma de données

Le modèle de données est simplifié à l'extrême pour répondre aux besoins V1 sans sur-ingénierie.

### Table `bookings` (Demandes & Réservations)
* `id` (UUID, PK)
* `created_at` (Timestamp)
* `guest_first_name` (Text)
* `guest_last_name` (Text)
* `guest_email` (Text)
* `guest_phone` (Text)
* `guest_message` (Text, nullable)
* `guest_locale` (Text, `'fr'` ou `'en'`)
* `check_in` (Date)
* `check_out` (Date)
* `guests_count` (Integer)
* `include_cleaning` (Boolean, default `false`)
* `total_price` (Decimal)
* `status` (Enum : `'pending'`, `'confirmed'`, `'rejected'`, `'cancelled'`)
* `rejection_reason` (Text, nullable)

### Table `blocked_dates` (Blocages manuels / iCal)
* `id` (UUID, PK)
* `start_date` (Date)
* `end_date` (Date)
* `reason` (Text, nullable — ex: *"Airbnb Sync"*, *"Maintenance"*)
* `source` (Enum : `'manual'`, `'airbnb_ical'`)

### Table `pricing_rules` (Saisons & Tarifs)
* `id` (UUID, PK)
* `name` (Text — ex: *"Haute Saison"*)
* `start_date` (Date)
* `end_date` (Date)
* `price_per_night` (Decimal)
* `min_stay_nights` (Integer, default `7`)
* `allowed_checkin_days` (Array of Integer — ex: `[6]` pour le samedi uniquement)

---

## 4. Architecture des pages (Routes)

### Espace Public (Multilingue via i18n Next.js)
* `/` : Accueil, accroche, résumé des atouts, avis Airbnb originaux.
* `/le-gite` : Agencement, équipements, inclus (linge) et options (ménage 50€).
* `/localisation` : Carte interactive Google Maps (8 cours de la Liberté, Saint-Saturnin-lès-Apt).
* `/galerie` : Galerie photos HD filtrable.
* `/reservation` : Calendrier de disponibilité, simulateur de prix et formulaire en 3 étapes.
* `/contact` : Formulaire de contact direct.
* `/mentions-legales` & `/cgv` : Pages légales et conditions d'annulation.

### Espace Admin (Protégé via Auth)
* `/admin/login` : Connexion sécurisée pour Judith.
* `/admin/dashboard` : Liste des demandes (en attente, confirmées, refusées) avec actions rapides 1-clic (Valider / Refuser + message).
* `/admin/planning` : Vue calendrier interactif pour le blocage/déblocage manuel de dates.
* `/admin/tarifs` : Interface de configuration des périodes tarifaires et séjours minimums.

---

## 5. Gestion de la réservation & Anti-double-booking


```

[Visiteur] -> Soumet demande -> Statut "pending"
│
├─► Dates bloquées immédiatement sur le site public
└─► Alerte e-mail envoyée à Judith

[Judith]   ──► Clique "Valider" ──► Statut "confirmed"
│
├─► Flux iCal mis à jour (Airbnb bloque la période)
└─► E-mail de confirmation envoyé au client

[Judith]   ──► Clique "Refuser" ──► Statut "rejected"
│
├─► Dates débloquées immédiatement sur le site
└─► E-mail de refus envoyé au client (+ mot de Judith)

```

1. **Option retenue (Spec V1) :** Demande de réservation directe sans paiement en ligne immédiat.
2. **Blocage préventif :** Dès qu'un visiteur valide le formulaire de demande, la réservation passe en statut `pending` et les dates sélectionnées sont **immédiatement bloquées** sur le calendrier du site public.
3. **Validation / Refus :**
   * **Validation :** La réservation passe en statut `confirmed`. Le flux iCal dynamique exporté inclut désormais cette plage de dates, bloquant ainsi le calendrier Airbnb lors de sa prochaine synchronisation.
   * **Refus :** La réservation passe en statut `rejected`. Les dates sont automatiquement libérées sur le calendrier du site.
4. **Synchronisation iCal Airbnb :**
   * **Export :** Route d'API API Next.js `/api/ical/export.ics` générant à la volée le fichier iCal lisible par Airbnb (incluant les réservations confirmées/en attente et les blocages manuels).
   * **Import :** Tâche CRON planifiée (toutes le 15 minutes) appelant `/api/ical/sync` pour lire le lien iCal Airbnb et mettre à jour la table `blocked_dates`.

---

## 6. Authentification partie admin

* **Solution :** Supabase Auth (Email / Mot de passe).
* **Niveau de sécurité :** Mono-utilisateur (dédié à Judith). Les routes `/admin/*` et les API associées sont sécurisées par middleware Next.js vérifiant le JWT utilisateur.
* **Simplicité :** Pas de création de compte publique ; l'identifiant de Judith est provisionné à l'initialisation.

---

## 7. Gestion des contenus et photos

* **Textes, Médias & Avis :** Tous les contenus textuels (FR/EN), la structure de la galerie photo et les avis voyageurs Airbnb sont directement intégrés et structurés dans le code source (fichiers JSON/Data TypeScript).
* **Maintenance :** Toute modification de photo ou de texte d'accroche sera effectuée par le développeur lors des opérations de maintenance.
* **Avantage :** Interface d'administration ultra-épurée pour Judith, focalisée exclusivement sur la gestion opérationnelle du gîte.

---

## 8. Intégrations tierces

* **E-mails transactionnels (Resend) :**
  * *Notification Hôte :* Alerte e-mail sur `les-restanques@gmail.com` à chaque nouvelle demande.
  * *Accusé de réception Voyageur :* E-mail automatique dans la langue du client (`FR` ou `EN`).
  * *Confirmation / Refus :* E-mails automatiques envoyés après l'action de Judith dans l'admin.
* **Google Maps API :** Intégration de la carte avec marqueur personnalisé sur l'adresse du gîte (*8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt*).
* **Avis Airbnb :** Composant d'affichage statique basé sur les avis fournis au développeur.

---

## 9. Structure du projet

```text
les-restanques-web/
├── public/
│   ├── images/              # Photos HD optimisées (galerie, gîte, vue, piscine)
│   └── favicon.ico
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (public)/        # Layout & Pages publiques (i18n)
│   │   │   ├── page.tsx     # Accueil
│   │   │   ├── le-gite/
│   │   │   ├── localisation/
│   │   │   ├── galerie/
│   │   │   ├── reservation/
│   │   │   └── contact/
│   │   ├── admin/           # Espace d'administration
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── planning/
│   │   │   └── tarifs/
│   │   └── api/             # API Routes
│   │       ├── ical/        # Export & Sync iCal
│   │       └── bookings/    # Endpoints de gestion des demandes
│   ├── components/          # Composants UI (Shadcn, Formulaires, Cartes)
│   ├── config/              # Données statiques (Avis Airbnb, contenus FR/EN)
│   ├── lib/                 # Clients Supabase, Resend, helpers de dates
│   └── types/               # Definitions TypeScript (Booking, Pricing, etc.)
├── .env.example
├── next.config.js
└── package.json
```

---

## 10. Variables d'environnement nécessaires

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend
RESEND_API_KEY=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Airbnb iCal Sync
AIRBNB_ICAL_URL=
CRON_SECRET_TOKEN=

# App / Contact
NEXT_PUBLIC_SITE_URL=[https://www.les-restanques-gite.fr](https://www.les-restanques-gite.fr)
HOST_NOTIFICATION_EMAIL=les-restanques@gmail.com

```

---

## 11. Déploiement

* **Plateforme :** o2switch (Node.js via Phusion Passenger).
* **Nom de domaine :** `les-restanques-gite.fr`.
* **Process :** Build Next.js (`npm run build`) et déploiement de l'application Node.js via le cPanel o2switch.
* **Environnement :** Production uniquement.

---

## 12. Points de vigilance techniques (V1)

1. **Délai de synchronisation iCal :** Airbnb ne rafraîchit ses imports iCal qu'à des intervalles variables (de 15 minutes à quelques heures). Les demandes faites sur le site bloquent l'agenda du site instantanément, mais l'actualisation sur Airbnb dépend du rythme de collecte d'Airbnb.
2. **Process de build lors des ajouts de contenus :** Toute modification de texte ou de photo nécessitera un redéploiement rapide par le développeur (livraison d'un build mis à jour).

---

## 13. Journal des questions posées (Technique)

| # | Thème | Question | Décision / Réponse retenue |
| --- | --- | --- | --- |
| **1** | Hébergement & Domaine | Quel nom de domaine et quel hébergeur ? | Nom de domaine : `les-restanques-gite.fr`. Hébergeur : o2switch. |
| **2** | Avis clients | Scraping automatique ou saisie statique des avis Airbnb ? | Saisie statique au format texte par le développeur. Pas de scraping. |
| **3** | Gestion médias | Gestion des photos/textes dans l'admin ou par le dev ? | Intégrés en dur par le développeur. L'admin reste 100% dédiée aux réservations. |
| **4** | E-mails transactionnels | Quel service d'envoi d'e-mails retenir ? | Utilisation de Resend pour sa fiabilité et sa simplicité d'intégration. |
| **5** | Déploiement | Nécessité d'un environnement de Staging/Preview ? | Non, un simple environnement de Production unique est suffisant. |
