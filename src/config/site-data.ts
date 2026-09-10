import { Amenity, Attraction, Review, GalleryImage } from "@/types";

export const siteConfig = {
  name: "Les Restanques",
  hostName: "Judith",
  classification: "3 étoiles Meublé de Tourisme",
  email: "les-restanques@gmail.com",
  phone: "+33 (0)6 00 00 00 00",
  address: {
    street: "8 cours de la Liberté",
    city: "Saint-Saturnin-lès-Apt",
    postalCode: "84490",
    region: "Vaucluse, Luberon, PACA",
    country: "France",
    coordinates: {
      lat: 43.9442,
      lng: 5.3831,
    },
  },
  capacity: {
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    toilets: 2,
    levels: "Rez-de-chaussée + Mezzanine",
  },
  stayRules: {
    checkIn: "16:00 - 20:00",
    checkOut: "10:00",
    defaultMinStayNights: 7,
    cleaningFee: 50,
    linenIncluded: true,
  },
};

export const reviews: Review[] = [
  {
    id: "rev-1",
    author: "Marc & Sophie",
    date: "Août 2025",
    rating: 5,
    badge: "Séjour en famille",
    title: "Un havre de paix au cœur du Luberon",
    content: {
      fr: "Nous avons passé un séjour merveilleux dans la maison de Judith. La vue sur le Luberon depuis la piscine et le jardin d'oliviers est tout simplement à couper le souffle. Le gros plus : pouvoir faire ses courses à pied dans le village en 5 minutes tout en étant au calme absolu. La maison est très lumineuse et parfaitement agencée. Nous reviendrons avec grand plaisir !",
      en: "We had a wonderful stay at Judith's home. The view over the Luberon from the pool and the olive garden is simply breathtaking. The huge plus: being able to walk to the village shops in 5 minutes while enjoying absolute calm. The house is bright and perfectly laid out. We will return with great pleasure!",
    },
  },
  {
    id: "rev-2",
    author: "Claire D.",
    date: "Juillet 2025",
    rating: 5,
    badge: "Séjour entre amis",
    title: "Emplacement parfait et hôte accueillante",
    content: {
      fr: "La maison correspond en tout point aux photos. Idéalement située pour visiter Roussillon, Gordes et le Colorado Provençal. Le jardin est immense, idéal pour se reposer à l'ombre des oliviers après une journée de randonnée. Judith est une hôte attentionnée et très réactive. Merci pour ce super séjour !",
      en: "The house corresponds in every way to the photos. Ideally situated to visit Roussillon, Gordes, and the Colorado Provençal. The garden is huge, perfect for relaxing under the olive trees after a day of hiking. Judith is an attentive and very responsive host. Thank you for this wonderful stay!",
    },
  },
  {
    id: "rev-3",
    author: "Thomas B.",
    date: "Juin 2025",
    rating: 5,
    badge: "Séjour en couple & amis",
    title: "Vue imprenable et confort absolu",
    content: {
      fr: "Une vraie maison provençale où l'on se sent tout de suite chez soi. Les deux espaces nuit séparés (rez-de-chaussée et mezzanine) apportent une vraie intimité quand on voyage à plusieurs. La piscine privée face à la vallée est magique au coucher du soleil.",
      en: "A genuine Provençal house where you feel instantly at home. The two separated sleeping spaces (ground floor and mezzanine) provide real privacy when traveling in a group. The private pool overlooking the valley is magical at sunset.",
    },
  },
];


export const amenities: Amenity[] = [
  {
    category: {
      fr: "Extérieurs & Détente",
      en: "Outdoors & Relaxation",
    },
    items: [
      {
        fr: "Piscine privée avec vue panoramique",
        en: "Private pool with panoramic valley view",
        icon: "Waves",
      },
      {
        fr: "Grand jardin arboré d'oliviers",
        en: "Expansive garden planted with olive trees",
        icon: "Trees",
      },
      {
        fr: "Terrasse avec table de repas extérieure",
        en: "Furnished dining terrace",
        icon: "Utensils",
      },
      {
        fr: "Espace Barbecue & Plancha",
        en: "Barbecue & Plancha outdoor grilling area",
        icon: "Flame",
      },
      {
        fr: "Coin ombragé farniente & transats",
        en: "Shaded lounge corner & sunbeds",
        icon: "Sun",
      },
      {
        fr: "Places de parking privées et gratuites sur place",
        en: "Free private on-site parking on the property",
        icon: "Car",
      },
      {
        fr: "Arrivée autonome (boîte à clés sécurisée)",
        en: "Self check-in via secure key lockbox",
        icon: "KeyRound",
      },
    ],
  },
  {
    category: {
      fr: "Cuisine & Repas",
      en: "Kitchen & Dining",
    },
    items: [
      {
        fr: "Cuisine équipée (plaques, four, micro-ondes)",
        en: "Fully equipped kitchen (cooktop, oven, microwave)",
        icon: "UtensilsCrossed",
      },
      {
        fr: "Lave-vaisselle & grand réfrigérateur / congélateur",
        en: "Dishwasher & large fridge / freezer",
        icon: "Refrigerator",
      },
      {
        fr: "Cafetière, bouilloire électrique & grille-pain",
        en: "Coffee maker, electric kettle & toaster",
        icon: "Coffee",
      },
      {
        fr: "Vaisselle complète, verres à vin & ustensiles de cuisine",
        en: "Full cookware, wine glasses & kitchen essentials",
        icon: "Wine",
      },
    ],
  },
  {
    category: {
      fr: "Confort Intérieur & Connectivité",
      en: "Indoor Comfort & Connectivity",
    },
    items: [
      {
        fr: "Wi-Fi haut débit illimité",
        en: "Unlimited high-speed Wi-Fi internet",
        icon: "Wifi",
      },
      {
        fr: "Grand séjour lumineux avec TV & espace repas",
        en: "Large luminous living room with TV & dining area",
        icon: "Tv",
      },
      {
        fr: "Lave-linge, fer et table à repasser",
        en: "Washing machine, iron & ironing board",
        icon: "Shirt",
      },
      {
        fr: "Chauffage pour les saisons fraîches & ventilateurs",
        en: "Heating for cooler months & fans",
        icon: "Thermometer",
      },
      {
        fr: "Sèche-cheveux dans les salles de bain",
        en: "Hair dryer in bathrooms",
        icon: "Wind",
      },
    ],
  },
  {
    category: {
      fr: "Famille & Sécurité",
      en: "Family & Safety",
    },
    items: [
      {
        fr: "Lit bébé (parapluie) & chaise haute sur demande",
        en: "Baby travel crib & high chair on request",
        icon: "Baby",
      },
      {
        fr: "Système de sécurité et alarme conforme pour la piscine",
        en: "Certified pool alarm / safety compliance",
        icon: "ShieldCheck",
      },
      {
        fr: "Détecteurs de fumée & extincteur",
        en: "Smoke detectors & fire extinguisher",
        icon: "ShieldAlert",
      },
    ],
  },
];


/* --------------------------------------------------------------------------
 * Photographies
 * Toutes les images proviennent du gîte et de la région.
 * Ce fichier reste la seule source de vérité pour les chemins.
 * ------------------------------------------------------------------------ */
export const photos = {
  /* Extérieurs & vue */
  panorama: "/images/gite/panorama-table.jpg",
  transatsVue: "/images/gite/transats-vue.jpg",
  terrassePergola: "/images/gite/terrasse-pergola.jpg",
  terrasseTable: "/images/gite/terrasse-table.jpg",
  jardinTable: "/images/gite/jardin-table.jpg",
  coinOmbrage: "/images/gite/coin-ombrage.jpg",
  jardinPiscine: "/images/gite/jardin-piscine.jpg",
  piscineRoses: "/images/gite/piscine-roses.jpg",
  piscineVillage: "/images/gite/piscine-village.jpg",
  /* Intérieurs */
  sejour: "/images/gite/sejour.jpg",
  salon: "/images/gite/salon.jpg",
  sejourMezzanine: "/images/gite/sejour-mezzanine.jpg",
  tableBouquet: "/images/gite/table-bouquet.jpg",
  salleAManger: "/images/gite/salle-a-manger.jpg",
  cuisine: "/images/gite/cuisine.jpg",
  cuisineDetail: "/images/gite/cuisine-detail.jpg",
  chambre1: "/images/gite/chambre-1.jpg",
  chambre1Bis: "/images/gite/chambre-1-bis.jpg",
  chambre2: "/images/gite/chambre-2.jpg",
  chambre3: "/images/gite/chambre-3.jpg",
  salleDeBain: "/images/gite/salle-de-bain.jpg",
  salleEau: "/images/gite/salle-eau.jpg",
  /* Région */
  saintSaturnin: "/images/region/saint-saturnin.jpg",
  saintSaturninCerisiers: "/images/region/saint-saturnin-cerisiers.jpg",
  roussillon: "/images/region/roussillon.jpg",
  coloradoProvencal: "/images/region/colorado-provencal.jpg",
  coloradoPanorama: "/images/region/colorado-panorama.jpg",
  gordes: "/images/region/gordes.jpg",
  lavande: "/images/region/lavande.jpg",
} as const;

export const attractions: Attraction[] = [
  {
    id: "att-1",
    name: "Saint-Saturnin-lès-Apt",
    kicker: { fr: "Le village", en: "The village" },
    distance: { fr: "300 m — 5 min à pied", en: "300 m — 5 min walk" },
    description: {
      fr: "Un village perché authentique, dominé par les ruines de son château et ses moulins à vent. Boulangerie, épicerie, cafés — et le marché provençal du mardi matin.",
      en: "An authentic perched village crowned by castle ruins and old windmills. Bakery, grocer, cafés — and the Provençal market on Tuesday mornings.",
    },
    imageUrl: photos.saintSaturnin,
  },
  {
    id: "att-2",
    name: "Roussillon & le sentier des Ocres",
    kicker: { fr: "Falaises d'ocre", en: "Ochre cliffs" },
    distance: { fr: "15 min en voiture", en: "15 min drive" },
    description: {
      fr: "Des façades flamboyantes accrochées à la falaise, et un sentier de promenade au milieu des sables rouges et jaunes, face au Mont Ventoux.",
      en: "Blazing façades clinging to the cliff, and a walking trail through red and yellow ochre sands facing Mont Ventoux.",
    },
    imageUrl: photos.roussillon,
  },
  {
    id: "att-3",
    name: "Le Colorado provençal",
    kicker: { fr: "Rustrel", en: "Rustrel" },
    distance: { fr: "15 min en voiture", en: "15 min drive" },
    description: {
      fr: "D'anciennes carrières d'ocre devenues un paysage de cheminées de fées et de canyons dorés, à parcourir tôt le matin quand la lumière est rasante.",
      en: "Former ochre quarries turned into a landscape of fairy chimneys and golden canyons — best walked early, when the light is low.",
    },
    imageUrl: photos.coloradoProvencal,
  },
  {
    id: "att-4",
    name: "Gordes & l'abbaye de Sénanque",
    kicker: { fr: "Plus beaux villages de France", en: "Most beautiful villages" },
    distance: { fr: "20 min en voiture", en: "20 min drive" },
    description: {
      fr: "Le village de pierre sèche dressé sur son éperon rocheux, et l'abbaye cistercienne posée au creux de son vallon de lavande.",
      en: "The dry-stone village standing on its rocky spur, and the Cistercian abbey nestled in its lavender valley.",
    },
    imageUrl: photos.gordes,
  },
  {
    id: "att-5",
    name: "Les plateaux de lavande",
    kicker: { fr: "De juin à mi-juillet", en: "June to mid-July" },
    distance: { fr: "20 à 40 min en voiture", en: "20 to 40 min drive" },
    description: {
      fr: "Sault, Saint-Christol, les abords de Simiane : les grandes lignes bleues arrivent fin juin et sont coupées vers la mi-août.",
      en: "Sault, Saint-Christol, the fields around Simiane: the long blue rows come in late June and are cut around mid-August.",
    },
    imageUrl: photos.lavande,
  },
  {
    id: "att-6",
    name: "Apt & son marché du samedi",
    kicker: { fr: "Le grand marché", en: "The big market" },
    distance: { fr: "10 min en voiture", en: "10 min drive" },
    description: {
      fr: "L'un des plus anciens marchés de Provence envahit toute la vieille ville chaque samedi matin. Apt est aussi la capitale du fruit confit depuis le XIVᵉ siècle.",
      en: "One of the oldest markets in Provence takes over the whole old town every Saturday morning. Apt has also been the capital of candied fruit since the 14th century.",
    },
    imageUrl: photos.saintSaturninCerisiers,
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "img-panorama",
    url: photos.panorama,
    alt: {
      fr: "Table dressée sous les arbres face à la vallée du Luberon",
      en: "Table set under the trees facing the Luberon valley",
    },
    category: "panorama",
    caption: {
      fr: "La table du jardin, face à la vallée",
      en: "The garden table, facing the valley",
    },
  },
  {
    id: "img-piscine-village",
    url: photos.piscineVillage,
    alt: {
      fr: "La piscine privée avec le village perché de Saint-Saturnin en arrière-plan",
      en: "The private pool with the perched village of Saint-Saturnin behind",
    },
    category: "piscine",
    caption: {
      fr: "Le bassin, au pied du village perché",
      en: "The pool, at the foot of the perched village",
    },
  },
  {
    id: "img-piscine-roses",
    url: photos.piscineRoses,
    alt: {
      fr: "La piscine vue depuis les rosiers du jardin, collines du Luberon à l'horizon",
      en: "The pool seen through the garden roses, Luberon hills on the horizon",
    },
    category: "piscine",
    caption: {
      fr: "Entre les rosiers et les oliviers",
      en: "Between the roses and the olive trees",
    },
  },
  {
    id: "img-jardin-piscine",
    url: photos.jardinPiscine,
    alt: {
      fr: "Le grand jardin d'oliviers descendant vers la piscine et la maison",
      en: "The large olive garden sloping down to the pool and the house",
    },
    category: "piscine",
    caption: {
      fr: "Le grand pré, les oliviers, la maison",
      en: "The meadow, the olive trees, the house",
    },
  },
  {
    id: "img-terrasse-table",
    url: photos.terrasseTable,
    alt: {
      fr: "Table dressée pour six sous la pergola de la terrasse",
      en: "Table set for six under the terrace pergola",
    },
    category: "exterieur",
    caption: { fr: "Le couvert est mis pour six", en: "Set for six" },
  },
  {
    id: "img-terrasse-pergola",
    url: photos.terrassePergola,
    alt: {
      fr: "La terrasse ombragée sous la treille, ouverte sur le jardin",
      en: "The shaded terrace under the vine, opening onto the garden",
    },
    category: "exterieur",
    caption: { fr: "L'ombre de la treille", en: "Under the vine" },
  },
  {
    id: "img-jardin-table",
    url: photos.jardinTable,
    alt: {
      fr: "Table de jardin et chiliennes à l'ombre du grand arbre",
      en: "Garden table and deckchairs in the shade of the big tree",
    },
    category: "exterieur",
    caption: {
      fr: "Le second couvert, au jardin",
      en: "The second table, in the garden",
    },
  },
  {
    id: "img-coin-ombrage",
    url: photos.coinOmbrage,
    alt: {
      fr: "Coin ombragé contre le mur de pierre, avec plancha et chilienne",
      en: "Shaded corner against the stone wall, with plancha and deckchair",
    },
    category: "exterieur",
    caption: {
      fr: "Le coin d'ombre et la plancha",
      en: "The shady corner and the plancha",
    },
  },
  {
    id: "img-transats",
    url: photos.transatsVue,
    alt: {
      fr: "Deux transats face au jardin d'oliviers et aux collines",
      en: "Two deckchairs facing the olive garden and the hills",
    },
    category: "panorama",
    caption: {
      fr: "Deux chaises, rien d'autre à faire",
      en: "Two chairs, nothing else to do",
    },
  },
  {
    id: "img-sejour",
    url: photos.sejour,
    alt: {
      fr: "Le séjour ouvert sur la cuisine et l'espace repas",
      en: "The living room opening onto the kitchen and dining area",
    },
    category: "interieur",
    caption: {
      fr: "Le séjour, ouvert sur la cuisine",
      en: "The living room, open to the kitchen",
    },
  },
  {
    id: "img-sejour-mezzanine",
    url: photos.sejourMezzanine,
    alt: {
      fr: "La grande pièce de vie sous hauteur, avec l'escalier de la mezzanine",
      en: "The double-height living space with the mezzanine staircase",
    },
    category: "interieur",
    caption: {
      fr: "Sous la hauteur, l'escalier de la mezzanine",
      en: "Beneath the height, the mezzanine stair",
    },
  },
  {
    id: "img-salon",
    url: photos.salon,
    alt: {
      fr: "Coin salon avec canapés, bibliothèque et télévision",
      en: "Lounge corner with sofas, bookshelves and television",
    },
    category: "interieur",
    caption: {
      fr: "Le coin salon et sa bibliothèque",
      en: "The lounge and its bookshelves",
    },
  },
  {
    id: "img-table-bouquet",
    url: photos.tableBouquet,
    alt: {
      fr: "Bouquet du jardin sur la table, portes-fenêtres ouvertes sur la verdure",
      en: "Garden flowers on the table, French windows open onto the greenery",
    },
    category: "interieur",
    caption: {
      fr: "Le bouquet du jardin, au matin",
      en: "Garden flowers, in the morning",
    },
  },
  {
    id: "img-salle-a-manger",
    url: photos.salleAManger,
    alt: {
      fr: "L'espace repas et la cheminée d'angle de la pièce de vie",
      en: "The dining area and corner fireplace of the living space",
    },
    category: "interieur",
    caption: {
      fr: "La grande table et la cheminée",
      en: "The long table and the fireplace",
    },
  },
  {
    id: "img-cuisine",
    url: photos.cuisine,
    alt: {
      fr: "La cuisine équipée avec sa poutre apparente et son plan de travail",
      en: "The fitted kitchen with exposed beam and worktop",
    },
    category: "interieur",
    caption: { fr: "La cuisine, sous la poutre", en: "The kitchen, under the beam" },
  },
  {
    id: "img-cuisine-detail",
    url: photos.cuisineDetail,
    alt: {
      fr: "Détail de la cuisine et de son passe-plat vers le séjour",
      en: "Kitchen detail and its serving hatch to the living room",
    },
    category: "interieur",
    caption: {
      fr: "Le passe-plat vers le séjour",
      en: "The hatch through to the living room",
    },
  },
  {
    id: "img-chambre-1",
    url: photos.chambre1,
    alt: {
      fr: "Chambre 1 au rez-de-chaussée avec lit double 160 cm et tomettes",
      en: "Ground-floor bedroom 1 with 160 cm double bed and terracotta tiles",
    },
    category: "interieur",
    caption: { fr: "Chambre 1 — lit double 160 cm", en: "Bedroom 1 — 160 cm double bed" },
  },
  {
    id: "img-chambre-1-bis",
    url: photos.chambre1Bis,
    alt: {
      fr: "Chambre 1, vue vers la fenêtre et le petit bureau",
      en: "Bedroom 1, looking towards the window and small desk",
    },
    category: "interieur",
    caption: { fr: "Chambre 1, côté fenêtre", en: "Bedroom 1, window side" },
  },
  {
    id: "img-chambre-2",
    url: photos.chambre2,
    alt: {
      fr: "Chambre 2 avec deux lits simples en 90 cm et placard",
      en: "Bedroom 2 with two 90 cm single beds and wardrobe",
    },
    category: "interieur",
    caption: { fr: "Chambre 2 — deux lits simples", en: "Bedroom 2 — two single beds" },
  },
  {
    id: "img-chambre-3",
    url: photos.chambre3,
    alt: {
      fr: "Chambre 3 en mezzanine, lit double 160 cm sous la poutre",
      en: "Mezzanine bedroom 3, 160 cm double bed beneath the beam",
    },
    category: "interieur",
    caption: { fr: "Chambre 3, en mezzanine", en: "Bedroom 3, on the mezzanine" },
  },
  {
    id: "img-salle-de-bain",
    url: photos.salleDeBain,
    alt: {
      fr: "Salle de bain du rez-de-chaussée avec baignoire et douche",
      en: "Ground-floor bathroom with bathtub and shower",
    },
    category: "interieur",
    caption: {
      fr: "Salle de bain — baignoire et douche",
      en: "Bathroom — tub and shower",
    },
  },
  {
    id: "img-salle-eau",
    url: photos.salleEau,
    alt: {
      fr: "Salle d'eau privative de la mezzanine, avec son œil-de-bœuf",
      en: "Private shower room on the mezzanine, with its round window",
    },
    category: "interieur",
    caption: {
      fr: "La salle d'eau de la mezzanine",
      en: "The mezzanine shower room",
    },
  },
  {
    id: "img-roussillon",
    url: photos.roussillon,
    alt: {
      fr: "Roussillon et ses façades ocre devant le Mont Ventoux enneigé",
      en: "Roussillon and its ochre façades before a snow-capped Mont Ventoux",
    },
    category: "panorama",
    caption: { fr: "Roussillon, face au Ventoux", en: "Roussillon, facing Mont Ventoux" },
  },
  {
    id: "img-colorado",
    url: photos.coloradoPanorama,
    alt: {
      fr: "Les falaises d'ocre du Colorado provençal au-dessus de la vallée",
      en: "The ochre cliffs of the Colorado Provençal above the valley",
    },
    category: "panorama",
    caption: {
      fr: "Le Colorado provençal, à Rustrel",
      en: "The Colorado Provençal, at Rustrel",
    },
  },
  {
    id: "img-gordes",
    url: photos.gordes,
    alt: {
      fr: "Le village de Gordes accroché à son éperon rocheux",
      en: "The village of Gordes clinging to its rocky spur",
    },
    category: "panorama",
    caption: { fr: "Gordes, à vingt minutes", en: "Gordes, twenty minutes away" },
  },
  {
    id: "img-lavande",
    url: photos.lavande,
    alt: {
      fr: "Champ de lavande en fleur au pied des monts de Vaucluse",
      en: "Lavender field in bloom at the foot of the Vaucluse mountains",
    },
    category: "panorama",
    caption: {
      fr: "La lavande, de fin juin à mi-juillet",
      en: "Lavender, late June to mid-July",
    },
  },
];

/* --------------------------------------------------------------------------
 * Les espaces, décrits un à un (page « Le Gîte »)
 * ------------------------------------------------------------------------ */
export interface Space {
  id: string;
  level: { fr: string; en: string };
  title: { fr: string; en: string };
  description: { fr: string; en: string };
  facts: { fr: string[]; en: string[] };
  images: string[];
}

export const spaces: Space[] = [
  {
    id: "vivre",
    level: { fr: "Rez-de-chaussée", en: "Ground floor" },
    title: { fr: "La pièce de vie", en: "The living space" },
    description: {
      fr: "Un seul grand volume sous hauteur, ouvert de la cuisine à la cheminée d'angle, et prolongé par la terrasse dès qu'on pousse les portes-fenêtres. C'est là que tout se passe : les petits-déjeuners qui s'éternisent, les parties de cartes le soir, les bouquets ramassés au jardin.",
      en: "One generous double-height volume running from the kitchen to the corner fireplace, extended by the terrace the moment you push the French windows open. This is where everything happens: long breakfasts, card games at night, flowers picked in the garden.",
    },
    facts: {
      fr: ["Cuisine équipée & lave-vaisselle", "Grande table pour 6 à 8", "Cheminée et bibliothèque"],
      en: ["Fitted kitchen & dishwasher", "Large table for 6 to 8", "Fireplace and bookshelves"],
    },
    images: [photos.sejourMezzanine, photos.salon, photos.cuisine],
  },
  {
    id: "chambres",
    level: { fr: "Rez-de-chaussée", en: "Ground floor" },
    title: { fr: "Les deux chambres du bas", en: "The two ground-floor bedrooms" },
    description: {
      fr: "Deux chambres calmes qui ouvrent sur le jardin, aux tomettes anciennes et aux rideaux de lin. Elles se partagent une salle de bain avec baignoire et un WC séparé.",
      en: "Two quiet bedrooms opening onto the garden, with old terracotta floors and linen curtains. They share a bathroom with a tub, plus a separate WC.",
    },
    facts: {
      fr: [
        "Chambre 1 — lit double 160 cm",
        "Chambre 2 — deux lits simples 90 cm",
        "Salle de bain avec baignoire + WC séparé",
      ],
      en: [
        "Bedroom 1 — 160 cm double",
        "Bedroom 2 — two 90 cm singles",
        "Bathroom with tub + separate WC",
      ],
    },
    images: [photos.chambre1, photos.chambre2, photos.salleDeBain],
  },
  {
    id: "mezzanine",
    level: { fr: "Mezzanine", en: "Mezzanine" },
    title: { fr: "La chambre du haut", en: "The upstairs bedroom" },
    description: {
      fr: "En haut de l'escalier, une troisième chambre à part, sous la poutre, avec sa propre salle d'eau et son WC. L'endroit idéal quand on voyage à deux couples — ou pour ceux qui se lèvent tard.",
      en: "At the top of the stairs, a third bedroom on its own, beneath the beam, with its own shower room and WC. Ideal when two couples travel together — or for late risers.",
    },
    facts: {
      fr: [
        "Chambre 3 — lit double 160 cm",
        "Salle d'eau privative avec WC",
        "Mezzanine ouverte sur le séjour",
      ],
      en: [
        "Bedroom 3 — 160 cm double",
        "Private shower room with WC",
        "Mezzanine open to the living room",
      ],
    },
    images: [photos.chambre3, photos.salleEau, photos.chambre1Bis],
  },
  {
    id: "dehors",
    level: { fr: "Dehors", en: "Outside" },
    title: { fr: "Le jardin, la piscine, la vue", en: "The garden, the pool, the view" },
    description: {
      fr: "Le vrai salon de la maison est dehors. Un grand pré planté d'oliviers descend vers la piscine ; deux tables, l'une sous la treille, l'autre à l'ombre du grand arbre, permettent de suivre le soleil toute la journée.",
      en: "The real living room is outside. A wide meadow of olive trees drops down to the pool; two tables — one under the vine, one in the shade of the big tree — let you follow the sun all day long.",
    },
    facts: {
      fr: [
        "Piscine privée clôturée et sécurisée",
        "Deux espaces repas extérieurs",
        "Plancha, barbecue et parking privé",
      ],
      en: [
        "Fenced and secured private pool",
        "Two outdoor dining areas",
        "Plancha, barbecue and private parking",
      ],
    },
    images: [photos.piscineVillage, photos.terrasseTable, photos.coinOmbrage],
  },
];
