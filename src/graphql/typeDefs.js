const typeDefs = `#graphql
  type Acteur {
    id: ID!
    nom: String!
    age: Int
  }

  type Film {
    id: ID!
    titre: String!
    annee: Int!
    acteurs: [Acteur]
  }

  type Query {
    getFilms(annee: Int): [Film]
    getFilm(id: ID!): Film
    getActeurs: [Acteur]
  }

  type Mutation {
    ajouterActeur(nom: String!, age: Int): Acteur
    ajouterFilm(titre: String!, annee: Int!): Film
    ajouterActeurAuFilm(filmId: ID!, acteurId: ID!): Film
    supprimerFilm(id: ID!): Film   # ✅ corrigé
  }

  type Subscription {
    filmAjoute: Film
  }
`;

module.exports = typeDefs;
