# Cabinet partagé Beaulieu — Chamalières

Site d'une page pour louer un espace de bureau à Chamalières (quartier Beaulieu, 63400) à un **groupe de professionnels libéraux** qui se constitue au fur et à mesure.

- Présentation du concept (loyer partagé, services mutualisés)
- Fiche du local et simulateur de coût par personne
- « Le groupe en formation » : les intéressés affichés par profession, jauge d'avancement, services les plus demandés
- Formulaire d'intérêt avec **cases à cocher des services communs** souhaités (accueil, salle d'attente, ménage, fibre, salle de réunion…)

Site statique : HTML, CSS et JavaScript, sans outil de compilation.

## Personnaliser

Tout se modifie dans **`config.js`** :

| Ce qu'il faut remplir | Clé |
|---|---|
| Surface, nombre de pièces, loyer, charges, adresse | `bureau.*` |
| Photos (déposez-les dans `assets/`) | `bureau.photos` |
| E-mail qui reçoit les candidatures | `contact.email` |
| Nombre de professionnels visé | `objectifGroupe` |
| Liste des services proposés | `services` |

Une valeur laissée à `null` n'est pas affichée. Le simulateur de coût apparaît dès que le loyer est renseigné.

## Recevoir les candidatures

- **Par défaut** : le bouton « Envoyer » ouvre la messagerie du visiteur avec un e-mail pré-rempli adressé à `contact.email`.
- **Recommandé** : créez un formulaire gratuit sur [formspree.io](https://formspree.io) et collez son adresse dans `formEndpoint`. Les candidatures arrivent alors directement par e-mail, sans que le visiteur ait à ouvrir sa messagerie.

## Faire grandir le groupe

À chaque candidature, si la personne a accepté d'apparaître, ajoutez une ligne dans `groupe` :

```js
{ profession: "Ostéopathe", jours: ["Mer", "Jeu"], statut: "intéressé", services: ["internet", "menage"] },
```

L'e-mail reçu contient une ligne « Identifiants services » à recopier directement dans `services`. Passez `statut` à `"confirmé"` quand la personne s'engage.

## Mettre en ligne

- **GitHub Pages** : *Settings → Pages → Deploy from a branch*, choisir la branche et `/ (root)`.
- **Netlify** : glisser-déposer le dossier sur [app.netlify.com/drop](https://app.netlify.com/drop).

Pour tester en local, ouvrez simplement `index.html` dans un navigateur.
