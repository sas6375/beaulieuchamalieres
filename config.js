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
    titre: "Espace bureau à partager — Beaulieu, Chamalières",
    quartier: "Quartier Beaulieu, Chamalières (63400)",
    adresse: null,                 // ex. "12 avenue de …, 63400 Chamalières" (null = masqué)
    surfaceM2: null,               // ex. 85
    nombreBureaux: null,           // ex. 3 (nombre de pièces pouvant servir de cabinet)
    loyerMensuelHC: null,          // loyer total hors charges, en €/mois, ex. 1200
    chargesMensuelles: null,       // en €/mois, ex. 150
    disponibilite: "Immédiate",
    annonceUrl: "https://www.seloger.com/annonce/location/auvergne-rhone-alpes/puy-de-dome-63/chamalieres-63400/26QAAUILJ1GW",
    atouts: [
      // Remplacez / complétez avec les vrais atouts du local
      "Quartier résidentiel recherché, à deux pas de Clermont-Ferrand",
      "Local adapté à l'accueil de patientèle ou de clientèle",
      "Possibilité de répartir les pièces entre plusieurs praticiens",
    ],
    photos: [
      // Déposez vos photos dans le dossier assets/ puis listez-les ici :
      // { src: "assets/salle-attente.jpg", legende: "Salle d'attente" },
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
  // Nombre de professionnels visé pour occuper le local.
  objectifGroupe: 4,
  // Mettez à jour cette liste à chaque nouvelle personne intéressée
  // (uniquement si elle a accepté d'apparaître, sans nom de famille).
  groupe: [
    // statut : "intéressé" ou "confirmé" ; services : identifiants de la liste plus bas
    // { profession: "Psychologue", jours: ["Lun", "Mar"], statut: "intéressé", services: ["attente", "menage"] },
    // { profession: "Ostéopathe",  jours: ["Mer", "Jeu", "Ven"], statut: "confirmé", services: ["internet", "menage"] },
  ],

  // ── Services communs proposés au choix ───────────────────────
  services: [
    { id: "accueil",     label: "Accueil / secrétariat partagé",         cat: "Accueil" },
    { id: "attente",     label: "Salle d'attente commune",               cat: "Accueil" },
    { id: "rdv",         label: "Logiciel de prise de rendez-vous commun", cat: "Accueil" },
    { id: "standard",    label: "Permanence téléphonique",               cat: "Accueil" },
    { id: "internet",    label: "Internet fibre & Wi-Fi",                cat: "Équipements" },
    { id: "imprimante",  label: "Imprimante / scanner",                  cat: "Équipements" },
    { id: "reunion",     label: "Salle de réunion / atelier de groupe",  cat: "Équipements" },
    { id: "cuisine",     label: "Coin cuisine / espace pause",           cat: "Équipements" },
    { id: "archives",    label: "Rangement / archives sécurisées",       cat: "Équipements" },
    { id: "menage",      label: "Ménage régulier",                       cat: "Entretien" },
    { id: "alarme",      label: "Alarme / sécurité",                     cat: "Entretien" },
    { id: "linge",       label: "Linge & consommables (draps d'examen…)", cat: "Entretien" },
    { id: "domiciliation", label: "Domiciliation professionnelle",       cat: "Administratif" },
    { id: "assurance",   label: "Assurance locaux mutualisée",           cat: "Administratif" },
    { id: "communication", label: "Plaque, site web & communication commune", cat: "Administratif" },
    { id: "parking",     label: "Place(s) de stationnement",             cat: "Administratif" },
  ],

  professions: [
    "Psychologue", "Psychothérapeute", "Coach", "Ostéopathe", "Kinésithérapeute",
    "Orthophoniste", "Sophrologue", "Diététicien·ne", "Infirmier·ère", "Sage-femme",
    "Médecin", "Podologue", "Avocat·e", "Expert-comptable", "Architecte",
    "Consultant·e", "Traducteur·rice", "Autre",
  ],
};
