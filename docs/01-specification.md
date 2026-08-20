# Spécifications Fonctionnelles & Cadrage — Site Web Gîte "Les Restanques"

**Version :** v1.0 (Finalisée)

**Date :** 19 Août 2026

**Statut :** Prêt pour architecture technique

---

## 1. Résumé du projet

Le projet consiste à concevoir un site web vitrine bilingue (Français / Anglais) avec système de demande de réservation directe pour le gîte **"Les Restanques"**, un meublé de tourisme classé 3 étoiles situé au 8 cours de la Liberté à Saint-Saturnin-lès-Apt (Luberon). Actuellement commercialisé uniquement sur Airbnb, le gîte disposera d'une vitrine propre au ton élégant et familial, permettant de générer des demandes directes sans commission d'intermédiaire tout en restant synchronisé avec le calendrier Airbnb. L'interface d'administration sera ultra-simple et pensée pour une hôte non-technique.

---

## 2. Objectifs

* **Objectifs Business :**
* Générer des réservations directes et affranchir progressivement le gîte des commissions Airbnb.
* Capturer une clientèle internationale (notamment anglophone, très présente dans le Luberon).
* Créer une identité visuelle propre et valoriser l'image de marque du gîte "Les Restanques".


* **Objectifs Utilisateur (Voyageur) :**
* Découvrir le lieu (photos HD, équipements, environnement, village à 300m).
* Soumettre une demande de réservation fluide en 3 étapes avec réponse rapide.


* **Objectifs Utilisateur (Propriétaire / Hôte) :**
* Valider ou refuser (avec message personnalisé) les demandes via une interface d'administration épurée.
* Ajuster facilement les tarifs, durées minimales de séjour et jours d'arrivée autorisés.
* Synchroniser automatiquement le calendrier avec Airbnb pour éviter le double-booking.

---

## 3. Périmètre V1 / Hors périmètre V2

* **Périmètre V1 :**
* Site vitrine bilingue **Français / Anglais** (textes gérés et fournis par le rédacteur).
* Création d'une identité visuelle complète (logo, charte graphique).
* Integration d'une carte Google Maps avec géolocalisation précise : *8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt*.
* Affichage des témoignages / avis voyageurs issus d'Airbnb.
* Workflow de demande de réservation directe sans paiement en ligne :
* Formulaire simple en 3 étapes (sans cases d'options spécifiques, champ libre "Message" suffisant).
* Blocage temporaire des dates sur le site jusqu'à l'action de l'hôte.
* Système de confirmation ou de refus (avec note personnalisée optionnelle).
* Notifications e-mails transactionnelles automatiques (FR/EN) envoyées vers/depuis l'adresse dédiée `les-restanques@gmail.com`.


* Module d'administration simple pour Judith : validation/annulation/refus de réservations, blocage manuel de dates, gestion des tarifs et durées minimales.
* Synchronisation bi-directionnelle des calendriers avec Airbnb (iCal).
* Mentions d'affichage : Linge inclus, Forfait ménage optionnel (50€), Taxe de séjour à régler sur place, Caution (à préciser).
* Horaires d'arrivée (16h-20h) et de départ (avant 10h) intégrés dans la communication client.
* Pages légales et modèles standards de CGV/Conditions d'annulation.


* **Hors périmètre V2 :**
* Paiement en ligne immédiat (CB / Stripe).
* Liens vers des réseaux sociaux (inexistants à ce jour).
* Gestion de caution en ligne automatique par empreinte bancaire.

---

## 4. Informations sur le gîte

* **Nom du gîte :** Les Restanques
* **Hôte :** Judith
* **E-mail de contact / notification :** `les-restanques@gmail.com`
* **Type :** Villa / Maison entière indépendante (3 étoiles Meublé de Tourisme)
* **Capacité :** 6 personnes | 3 chambres | 4 lits | 2 SDB | 2 WC
* **Agencement :**
* *RDC :* Pièce de vie (cuisine équipée, salon, espace repas), Chambre 1 (lit 160), Chambre 2 (2 lits 90), 1 SDB, 1 WC séparé.
* *Étage/Mezzanine :* Mezzanine ouverte, Chambre 3 (lit 160) avec salle de douche attenante + WC.


* **Équipements & Inclusions :** Piscine privée, vue panoramique Luberon, grand jardin d'oliviers, terrasse, barbecue/plancha, Wi-Fi haut débit, parking privé, arrivée autonome (boîte à clés), équipements bébé. **Linge de maison inclus par défaut.**
* **Localisation :** 8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt (300m du village à pied), Vaucluse / Luberon.
* **Conditions de séjour :**
* Arrivée : entre 16h00 et 20h00.
* Départ : avant 10h00.
* Jours d'arrivée/départ : Généralement le samedi (configurable selon période).
* Taxe de séjour : À régler sur place.
* Caution : Mention informative (montant en attente de validation client).

---

## 5. Personas

* **Persona 1 : Le Voyageur Français ou International (Famille / Groupe d'amis)**
* *Besoin :* Trouver un hébergement de charme avec piscine dans le Luberon, avec des consignes claires en français ou en anglais.
* *Attente :* Photos HD attrayantes, carte précise, témoignages rassurants, simulateur de prix exact (incluant l'option ménage et l'indication de la taxe de séjour), formulaire de demande simple.


* **Persona 2 : L'Hôte (Judith)**
* *Profil :* Non-technique, recherche la simplicité absolue.
* *Besoin :* Recevoir une alerte e-mail sur `les-restanques@gmail.com` à chaque demande, accepter ou refuser avec un petit mot en 1 clic, bloquer des dates, et configurer des séjours minimums par saison.

---

## 6. Parcours utilisateur (Gherkin / Étant donné - Quand - Alors)

### SCÉNARIO 1 : Demande de réservation par le voyageur (FR/EN)

* **Étant donné que** le visiteur (francophone ou anglophone) sélectionne ses dates et son nombre d'occupants,
* **Quand** il soumet le formulaire de coordonnées (Nom, Prénom, Email, Téléphone, Message libre),
* **Alors** les dates choisies sont bloquées sur le site public jusqu'à l'action de l'hôte, un accusé de réception automatique est envoyé au client dans sa langue, et un e-mail d'alerte est envoyé à Judith sur `les-restanques@gmail.com`.

### SCÉNARIO 2 : Refus d'une demande par l'hôte (Administrateur)

* **Étant donné que** Judith consulte une demande en attente dans son administration,
* **Quand** elle clique sur "Refuser", qu'elle saisit éventuellement un message explicatif pour le client et valide,
* **Alors** les dates sont immédiatement débloquées sur le calendrier du site public, et un e-mail automatique de refus contenant son message personnalisé est envoyé au client depuis `les-restanques@gmail.com`.

### SCÉNARIO 3 : Validation d'une demande par l'hôte (Administrateur)

* **Étant donné que** Judith consulte une demande en attente,
* **Quand** elle clique sur "Valider",
* **Alors** la réservation passe au statut "Validée", le flux iCal est mis à jour pour bloquer Airbnb, et le client reçoit un e-mail de confirmation récapitulant les modalités (adresse : 8 cours de la Liberté, horaires 16h-20h / 10h, taxe de séjour sur place, etc.).

---

## 7. Pages du site public (Multilingues FR/EN)

1. **Accueil / Vitrine :** Accroche visuelle, photos HD du gîte "Les Restanques", résumé des atouts (vue, piscine, village à 300m), section d'affichage des avis Airbnb originaux.
2. **Le Gîte & Inclusions :** Agencement RDC/Mezzanine, photos détaillées, liste des équipements (linge inclus, option ménage 50€).
3. **Localisation & Région :** Carte interactive Google Maps avec l'adresse exacte (8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt), accès village à 300m, principaux lieux touristiques du Luberon.
4. **Galerie Photos HD :** Filtres par espace (Piscine & Jardin, Intérieur, Vue).
5. **Réservation & Disponibilités :** Calendrier dynamique, simulateur de prix (respectant la règle de séjour minimum configurable), formulaire en 3 étapes.
6. **Contact :** Formulaire direct et coordonnées.
7. **Pages Légales :** Mentions légales, CGV standard, Conditions d'annulation, RGPD.

---

## 8. Fonctionnalités de la partie admin

* **Accès sécurisé épuré** pour Judith.
* **Gestion des Demandes :**
* Liste des demandes (En attente, Validée, Refusée).
* Action en 1 clic : Valider ou Refuser (avec champ pour message personnalisé).


* **Gestion du Calendrier & Règles de séjour :**
* Visualisation du planning.
* Blocage / déblocage manuel de dates.
* Définition de la durée minimale de séjour par période/semaine.
* Définition des jours d'arrivée autorisés par période.


* **Moteur de Tarification :**
* Périodes tarifaires (Basse, Moyenne, Haute saison).
* Override de prix sur des nuits/semaines spécifiques.
* Configuration des options (Ménage 50€, mention caution).


* **Synchronisation iCal** bi-directionnelle avec Airbnb.

---

## 9. Exigences non-fonctionnelles

* **Internationalisation (i18n) :** Bascule fluide Français / Anglais sur toutes les pages publiques et dans les e-mails envoyés aux clients (textes rédigés en interne).
* **Ergonomie UI/UX Admin :** Interface ultra-simple sur desktop et mobile pour Judith.
* **Performance :** Chargement rapide des photos HD.
* **SEO Local & Touristique :** Référencement ciblé FR et EN pour la recherche de gîtes dans le Luberon.
* **Intégration Maps :** Intégration propre de Google Maps avec marqueur personnalisé sur l'adresse du gîte.

---

## 10. Contraintes de synchronisation Airbnb

* Export du calendrier via lien **iCal** du site vers Airbnb.
* Import régulier du lien iCal d'Airbnb vers le site pour bloquer les dates louées sur la plateforme.
* Les demandes en attente sur le site bloquent le calendrier du site immédiatement pour éviter tout sur-booking direct.

---

## 11. Points en attente / à valider avec le client

* Montant et modalités de la caution (marqué comme "à voir avec le client", sans blocage pour la V1).
* Grille tarifaire exacte par saison et découpage des dates (à renseigner directement par le client via l'interface admin une fois livrée).

---

## 12. Journal des questions posées

| # | Thème | Question | Réponse |
| --- | --- | --- | --- |
| 1 | Identité | Nom exact du gîte ? | "Les Restanques" |
| 2 | Branding | Logo / Charte existants ? | À créer. |
| 3 | Ton | Ton des contenus ? | Élégant et familial. |
| 4 | Réservation | Mode de réservation V1 ? | Demande de réservation sans paiement immédiat (3 étapes, notifications). |
| 5 | Paiement | Fonctionnement paiement / acompte ? | Pas de paiement en ligne en V1. |
| 6 | Tarifs | Structure des tarifs & frais ? | Par saisons + override + option ménage (50€) + caution. |
| 7 | Synchro | Autres plateformes en plus d'Airbnb ? | Seul Airbnb pour le moment (iCal). |
| 8 | Photos | Photos HD disponibles ? | Oui, disponibles sans filigrane. |
| 9 | Linge | Linge de maison inclus ou option ? | Inclus par défaut. |
| 10 | Admin | Aisance hôte & périmètre admin ? | Non-technique. Interface fluide pour calendrier et tarifs. |
| 11 | Légal | Textes CGV existants ? | À générer (modèle standard). |
| 12 | Suivi | Maintenance post-livraison ? | Assurée par le développeur. |
| 13 | Workflow | Durée de blocage temporaire des dates ? | Blocage infini jusqu'à action de l'hôte (validation/refus). |
| 14 | Workflow | Gestion d'un refus par l'hôte ? | E-mail auto au client + déblocage dates + message personnalisé possible. |
| 15 | Tarifs | Durée minimale de séjour ? | Configurable par l'hôte selon les périodes/semaines. |
| 16 | Conditions | Jours et heures check-in / check-out ? | Samedi généralement (variable), arrivée 16h-20h, départ avant 10h. |
| 17 | Tarifs | Montant et gestion de la caution ? | Non déterminé pour l'instant (à voir avec le client). |
| 18 | Tarifs | Gestion de la taxe de séjour ? | Indiquée comme "à régler sur place". |
| 19 | Contenu | Langues du site ? | Français et Anglais. |
| 20 | Branding | Réseaux sociaux à intégrer ? | Aucun réseau social. |
| 21 | Formulaire | Champs optionnels additionnels ? | Non, le champ texte libre "Message" suffit. |
| 22 | Notification | Adresse e-mail de réception des alertes ? | `les-restanques@gmail.com` |
| 23 | Localisation | Type de carte et adresse ? | Carte Google Maps précise : 8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt. |
| 24 | Confiance | Intégration des avis Airbnb ? | Oui, affichage des avis voyageurs extraits d'Airbnb. |
| 25 | Contenu | Traduction Anglaise ? | Textes FR et EN fournis/rédigés par le rédacteur du site. |
