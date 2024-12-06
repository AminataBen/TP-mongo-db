# Projet API MongoDB Express

## Description

Ce projet est une API RESTful construite avec Node.js, Express, TypeScript, et MongoDB (via Mongoose). L'application gère deux entités, `Projets` et `Tâches`, avec une relation un-à-plusieurs entre elles. L'API permet d'effectuer des opérations CRUD sur ces deux entités, avec des routes spécifiques pour filtrer et mettre à jour les données.

## Fonctionnalités

- **Projets** :
  - Créer, lire, mettre à jour et supprimer des projets.
  - Définir le statut d'un projet (planifié, en cours, terminé).
  - Marquer un projet comme terminé.
  - Filtrer les projets par statut.

- **Tâches** :
  - Créer, lire, mettre à jour et supprimer des tâches.
  - Marquer une tâche comme terminée.
  - Filtrer les tâches par date d'échéance.
  - Associer des tâches à des projets spécifiques.

## Technologies utilisées

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

## Installation et Configuration

### Prérequis

- Node.js installé : https://nodejs.org/
- MongoDB en local ou utilisez MongoDB Atlas pour une instance cloud.

### 1. Clonez le dépôt

```bash
git clone https://github.com/AminataBen/mongodb-main.git
cd mongodb-main
