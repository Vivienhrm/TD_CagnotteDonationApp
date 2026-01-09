# Cagnottes & Donations - Application Vue.js

> Projet réalisé dans le cadre du TD5 - Web Client Avancé  
> IUT Charlemagne - Université de Lorraine

- Réalisé par : **[HERRMANN Vivien](https://github.com/Vivienhrm)**

![Vue.js](https://img.shields.io/badge/Vue.js-3.0-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-007ACC?style=flat-square&logo=axios&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## Description du projet

Application web de gestion de cagnottes et de dons, développée avec **Vue.js 3**. L'application permet de créer des cagnottes, de définir des objectifs financiers et de suivre l'avancement en temps réel grâce à la saisie de dons. Le projet met l'accent sur l'utilisation des **Plugins**, **Mixins**, **Directives** personnalisées et les **Transitions** Vue.js.

## Fonctionnalités implémentées

### Gestion des Cagnottes
- **Tableau de bord** : Liste des cagnottes en cours et terminées (triées par échéance).
- **Cycle de vie complet** : Création, modification et suppression des cagnottes.
- **Suivi visuel** : Indicateurs de couleur selon l'urgence de la date de fin (Bleu/Orange/Rouge).

### Système de Donations
- **Gestion des Dons** : Ajout, édition et suppression de donations pour chaque cagnotte.
- **Calculs en temps réel** : Les statistiques (total récolté, reste à financer, pourcentage, moyenne) sont déduites dynamiquement de la liste des dons.
- **Support de l'Over-funding** : Gestion correcte des cagnottes dépassant 100% de leur objectif.

### Expérience Utilisateur (UX/UI)
- **Boîte à outils (Plugins)** : Mixins personnalisés pour le formatage des monnaies (€) et des dates (FR/DB).
- **Directives** : Mise en place d'une directive `v-focus` pour l'ergonomie des formulaires.
- **Animations** : Transitions fluides lors de l'ajout ou de la suppression de donations dans la liste.

## Technologies utilisées

- **Vue.js 3** : Framework principal (Options API).
- **Vue Router 4** : Gestion de la navigation SPA et des routes imbriquées (Nested Routes).
- **Axios** : Client HTTP avec instance centralisée via un plugin.
- **Vite** : Environnement de développement et build.
- **ES6+** : Logique applicative.

---

## Architecture technique

### Structure du projet

```
src/
├── components/          # Composants réutilisables (Cagnotte, Donation)
├── plugins/             # Logique globale (api.js, tools.js)
├── router/              # Configuration des routes imbriquées
├── views/               # Vues principales et onglets de détails
│   ├── Cagnottes.vue    # Liste d'accueil
│   ├── CagnotteNew.vue  # Formulaire de création
│   ├── CagnotteEdit.vue # Formulaire d'édition
│   ├── CagnotteDetails.vue # Parent des onglets
│   ├── CagnotteInfos.vue   # Onglet Statistiques
│   └── Donations.vue       # Onglet Gestion des dons
├── App.vue              # Point d'entrée layout
└── main.js              # Initialisation et enregistrement des plugins
```

---

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Vivienhrm/TD_CagnotteDonationApp
   cd TD_CagnotteDonationApp
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

---

## Configuration API

L'application communique avec l'API `https://donations.edu.netlor.fr`.  
La clé API est configurée dans le fichier `src/main.js`. Assurez-vous d'avoir obtenu votre clé via une requête POST sur `/api/apikeys`.

---

## Lancement

1. Démarrer le serveur de développement :
   ```bash
   npm run dev
   ```
2. Accéder à l'application via `http://localhost:5173`.
