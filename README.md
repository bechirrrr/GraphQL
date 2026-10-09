# 🎬 GraphQL Movies API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo%20Server-311C87?style=flat&logo=apollographql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

A **GraphQL API** for managing movies and actors, with **queries**, **mutations** and **real-time subscriptions** over WebSockets.

## ✨ Features

- 🔎 **Queries**: list movies (optionally filtered by year), get one movie, list actors
- ✏️ **Mutations**: add actors and movies, link an actor to a movie, delete a movie
- ⚡ **Subscriptions**: get notified in real time when a movie is added (`graphql-ws`)
- 🗄️ **MongoDB** persistence with Mongoose models and relations (Film ↔ Acteur)

## 🧱 Tech stack

Apollo Server 4 · Express 5 · GraphQL 16 · graphql-ws · Mongoose · MongoDB

## 🧬 Schema

```graphql
type Film    { id: ID!, titre: String!, annee: Int!, acteurs: [Acteur] }
type Acteur  { id: ID!, nom: String!, age: Int }

type Query {
  getFilms(annee: Int): [Film]
  getFilm(id: ID!): Film
  getActeurs: [Acteur]
}

type Mutation {
  ajouterActeur(nom: String!, age: Int): Acteur
  ajouterFilm(titre: String!, annee: Int!): Film
  ajouterActeurAuFilm(filmId: ID!, acteurId: ID!): Film
  supprimerFilm(id: ID!): Film
}

type Subscription { filmAjoute: Film }
```

## 🚀 Getting started

```bash
git clone https://github.com/bechirrrr/GraphQL.git
cd GraphQL
npm install
echo "MONGO_URI=mongodb://localhost:27017/films" > .env
npm run dev
```

Open the Apollo Sandbox at `http://localhost:4000/graphql` (subscriptions on `ws://localhost:4000/graphql`).

### Example

```graphql
mutation {
  ajouterFilm(titre: "Inception", annee: 2010) { id titre }
}

subscription {
  filmAjoute { titre annee }
}
```

## 📁 Project structure

```
src/
├── config/db.js          # MongoDB connection
├── graphql/typeDefs.js   # GraphQL schema
├── graphql/resolvers.js  # Query / Mutation / Subscription resolvers
├── models/               # Mongoose models: Film, Acteur
└── index.js              # Express + Apollo + WebSocket server
```

## 👤 Author

**Bechir Marweni**: [LinkedIn](https://www.linkedin.com/in/bechir-marweni-790032279) · [GitHub](https://github.com/bechirrrr)
