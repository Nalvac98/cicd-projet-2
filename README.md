# cicd-projet

![Statut](https://github.com/nalvac/cicd-projet/actions/workflows/main.yml/badge.svg?branch=main&event=push)

[![codecov](https://codecov.io/gh/Nalvac/cicd-projet/graph/badge.svg?token=NDEASODT50)](https://codecov.io/gh/Nalvac/cicd-projet)

L'application permet de s'authentifier en utilisant une base de données MongoDB et des tokens JWT. Un frontend en Vue.js et un backend en Node.js qui 
agit à la fois comme API pour l'authentification et comme serveur Web pour servir le build Vue.js.

L'app est déployé sur un vps à l'adresse:  `http://162.19.228.83/`.

*L'objectif est de créer un pipeline CI / CD comme décrit ci-dessous:*

    - Mettre en place une procédure d’intégration continue (CI) sur les pull requests envoyées à votre projet
    - Mettre en place une procédure de déploiement continu, en extension du CI, sur la branch principale de votre dépôt de code
    - Mettre en place une procédure de livraison continue (CD) lors de la création d’un tag git sur votre dépôt

# Workflow GitHub Actions

## Jobs

### 1. Unit-tests-backend
- **Objectif :** Effectue des tests unitaires sur le backend.
- **Quand :** Déclenché sur chaque pull request (`pull_request` event) et sur chaque push sur la branche principale (`main`).
- **Étapes :**
    - Checkout du code.
    - Installation de Node.js et des dépendances.
    - Exécution de linting (`npm run lint`).
    - Vérification des vulnérabilités des dépendances (`npm audit`).
    - Exécution des tests (`npm run test:ci`).
    - Upload des rapports de couverture à Codecov.

### 2. Unit-test-frontend
- **Objectif :** Effectue des tests ou des vérifications sur le frontend.
- **Quand :**  Déclenché sur chaque pull request (`pull_request` event) et sur chaque push sur la branche principale (`main`).
- **Étapes :**
    - Checkout du code.
    - Installation de Node.js et des dépendances.
    - Exécution de linting (`npm run lint`).
    - Vérification des vulnérabilités des dépendances (`npm audit`).

### 3. Build-frontend
- **Objectif :** Construit l'application frontend.
- **Quand :** Déclenché sur chaque push sur la branche principale (`main`) et sur chaque création de tag (`refs/tags/`).
- **Étapes :**
    - Checkout du code.
    - Installation de Node.js et des dépendances.
    - Construction de l'application frontend (`npm run build`).
    - Upload de l'artifact contenant les fichiers du build générés (`./client/dist`).

### 4. Deploy
- **Objectif :** Déploie l'application sur un serveur distant `http://162.19.228.83/`.
- **Quand :** Dépend de `Unit-tests-backend` et `Build-frontend`.
- **Conditions :** Si le push est sur un tag (`refs/tags/`).
- **Étapes :**
    - Checkout du code.
    - Téléchargement de l'artifact du job `Build-frontend`.
    - Copie des fichiers d'artifact sur le serveur distant.
    - Installation des dépendances sur le serveur.
    - Redémarrage du service avec `pm2`.

    

### CI (Intégration Continue) - Pull Requests

1. Commande(s) pour reproduire les étapes du CI sur une PR:

    * Backend  
   ```shell
    npm install  # Installation des dépendances
    npm run lint  # Exécution du linting
    npm audit  # Vérification des vulnérabilités des dépendances
    npm run test:ci  # Exécution des tests
   ```
   * Frontend
   ```shell
   npm install  # Installation des dépendances
   npm run lint  # Exécution du linting
   npm audit  # Vérification des vulnérabilités des dépendances
   ```
    Ces commandes correspondent aux étapes de vérification de code, de linting, d'audit des dépendances, et de tests.

## CD et  déploiement continu

1. Commande(s) pour reproduire les étapes du CI sur une PR

Le livrable produit par le CD dans le workflow est l'artifact généré lors du Build du frontend (déploiement continu).
Cet artifact est une archive contenant les fichiers générés lors de la construction de l'application frontend. Il est stocké dans le répertoire ./client/dist et est téléchargé pendant le job Deploy (livraison continu).

##  Procédure à suivre par Damien Duportal

* Damien pourrait suivre ses différentes étapes lors de la création de nouvelle fonctionnalité
    
    1. Créer une branche à partir de la branche principale
    2. Tester au cours de son développement les différentes commande pour la ci pour s'assurer qu'il n'y a pas d'erreur
    3. Créer une pr à la fin du développement d'une fonctionnalité
    4. Vérifier si cette pr ne présente aucune erreur
    5. Si aucune erreur n'est signalé faire un merge sur la branche principale
    6. Pour la tout fin ajouter un tag afin de lancer l'app en prod
       ```shell
          git tag -a v1.0.0 -m "Description du tag"
          git push origin v1.0.0
       ```