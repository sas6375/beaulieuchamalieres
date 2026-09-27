/*
 * ──────────────────────────────────────────────────────────────
 *  CONFIGURATION DU SITE — c'est le SEUL fichier à modifier.
 *  Remplacez les valeurs entre guillemets. Laissez `null` pour
 *  masquer une information que vous ne souhaitez pas afficher.
 * ──────────────────────────────────────────────────────────────
 */
window.SITE_CONFIG = {
  // ── Le bureau ────────────────────────────────────────────────
  bureau: {
    titre: "Plateau de bureaux de 403 m² à partager — Espace Beaulieu, Chamalières",
    quartier: "Espace Beaulieu · Chamalières (63400)",
    adresse: null,                 // ex. "…, 63400 Chamalières" (null = masqué)
    surfaceM2: 403,
    etage: "4e étage, immeuble tertiaire",
    nombreBureaux: null,           // l'annonce indique « nombreux bureaux indépendants » : précisez le nombre si vous le connaissez
    loyerMensuelCC: 4880,          // loyer total charges comprises, TTC, en €/mois
    chargesDetail: "Taxe foncière, charges générales et eau comprises",
    parking: "Plusieurs places privatives",
    disponibilite: "Immédiate",
    annonceUrl: "https://www.seloger.com/annonce/location/auvergne-rhone-alpes/puy-de-dome-63/chamalieres-63400/26QAAUILJ1GW",
    atouts: [
      "Au sein de l'Espace Beaulieu, à proximité immédiate de Clermont-Ferrand, des principaux axes et des transports",
      "Nombreux bureaux indépendants, déjà cloisonnés : chacun son cabinet",
      "Espace accueil, salle de réunion, local serveur, archives et sanitaires déjà en place",
      "Plateau modulable, facilement réorganisable ou divisible en plusieurs lots",
      "Plusieurs places de parking privatives, pour les praticiens comme pour la clientèle",
      "Charges comprises : taxe foncière, charges générales et consommation d'eau",
    ],
    photos: [
      // Déposez vos photos dans le dossier assets/ puis listez-les ici :
      // { src: "assets/accueil.jpg", legende: "Espace accueil" },
    ],
  },

  // ── Contact & envoi du formulaire ────────────────────────────
  contact: {
    nom: "La propriétaire",
    email: "contact@exemple.fr",   // ← à remplacer : reçoit les candidatures si pas de Formspree
    telephone: null,               // ex. "06 00 00 00 00"
  },
  // Adresse Formspree (gratuit : https://formspree.io) pour recevoir les
  // inscriptions directement par e-mail, sans que le visiteur ouvre sa messagerie.
  // Exemple : "https://formspree.io/f/abcdwxyz". Si null → envoi par e-mail classique.
  formEndpoint: null,

  // ── Le groupe en formation ───────────────────────────────────
  // Nombre de professionnels visé pour occuper le plateau (≈ un par bureau).
  objectifGroupe: 10,
  // Mettez à jour cette liste à chaque nouvelle personne intéressée
  // (uniquement si elle a accepté d'apparaître, sans nom de famille).
  groupe: [
    // statut : "intéressé" ou "confirmé" ; services : identifiants de la liste plus bas
    // { profession: "Psychologue", jours: ["Lun", "Mar"], statut: "intéressé", services: ["attente", "menage"] },
    // { profession: "Ostéopathe",  jours: ["Mer", "Jeu", "Ven"], statut: "confirmé", services: ["internet", "menage"] },
  ],

  // ── Services communs proposés au choix ───────────────────────
  // surPlace: true → l'espace existe déjà dans le local (affiché « déjà sur place »)
  services: [
    { id: "accueil",     label: "Accueil / secrétariat partagé",         cat: "Accueil" },
    { id: "attente",     label: "Salle d'attente commune",               cat: "Accueil", surPlace: true },
    { id: "rdv",         label: "Logiciel de prise de rendez-vous commun", cat: "Accueil" },
    { id: "standard",    label: "Permanence téléphonique",               cat: "Accueil" },
    { id: "internet",    label: "Internet fibre & Wi-Fi (local serveur)", cat: "Équipements" },
    { id: "imprimante",  label: "Imprimante / scanner",                  cat: "Équipements" },
    { id: "reunion",     label: "Salle de réunion / atelier de groupe",  cat: "Équipements", surPlace: true },
    { id: "cuisine",     label: "Coin cuisine / espace pause",           cat: "Équipements" },
    { id: "archives",    label: "Rangement / archives sécurisées",       cat: "Équipements", surPlace: true },
    { id: "menage",      label: "Ménage régulier",                       cat: "Entretien" },
    { id: "alarme",      label: "Alarme / sécurité",                     cat: "Entretien" },
    { id: "linge",       label: "Linge & consommables (draps d'examen…)", cat: "Entretien" },
    { id: "domiciliation", label: "Domiciliation professionnelle",       cat: "Administratif" },
    { id: "assurance",   label: "Assurance locaux mutualisée",           cat: "Administratif" },
    { id: "communication", label: "Plaque, site web & communication commune", cat: "Administratif" },
    { id: "parking",     label: "Place de parking privative",            cat: "Administratif", surPlace: true },
  ],

  professions: [
    "Psychologue", "Psychothérapeute", "Coach", "Ostéopathe", "Kinésithérapeute",
    "Orthophoniste", "Sophrologue", "Diététicien·ne", "Infirmier·ère", "Sage-femme",
    "Médecin", "Podologue", "Avocat·e", "Expert-comptable", "Architecte",
    "Consultant·e", "Formateur·rice", "Traducteur·rice", "Autre",
  ],
};
