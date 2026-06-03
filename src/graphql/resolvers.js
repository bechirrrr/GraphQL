const { PubSub } = require("graphql-subscriptions");
const Film = require("../models/Film");
const Acteur = require("../models/Acteur");

const pubsub = new PubSub();
const FILM_AJOUTE = "FILM_AJOUTE";

const resolvers = {
  Query: {
    getFilms: async (_, { annee }) => {
      if (annee) return await Film.find({ annee }).populate("acteurs");
      return await Film.find().populate("acteurs");
    },

    getFilm: async (_, { id }) => {
      const film = await Film.findById(id).populate("acteurs");
      if (!film) throw new Error("Film non trouvé");
      return film;
    },

    getActeurs: async () => await Acteur.find(),
  },

  Mutation: {
    ajouterActeur: async (_, { nom, age }) => {
      if (!nom) throw new Error("Nom requis");

      const acteur = new Acteur({ nom, age });
      return await acteur.save();
    },

    ajouterFilm: async (_, { titre, annee }) => {
      if (!titre || !annee) {
        throw new Error("Titre et année sont requis");
      }

      const film = new Film({ titre, annee });
      await film.save();

      // 🔥 Notification temps réel
      pubsub.publish(FILM_AJOUTE, { filmAjoute: film });

      return film;
    },

    ajouterActeurAuFilm: async (_, { filmId, acteurId }) => {
      const film = await Film.findById(filmId);
      if (!film) throw new Error("Film non trouvé");

      const acteur = await Acteur.findById(acteurId);
      if (!acteur) throw new Error("Acteur non trouvé");

      // éviter doublons
      if (!film.acteurs.includes(acteurId)) {
        film.acteurs.push(acteurId);
      }

      await film.save();

      return await Film.findById(filmId).populate("acteurs");
    },

    supprimerFilm: async (_, { id }) => {
      const film = await Film.findByIdAndDelete(id);
      if (!film) throw new Error("Film non trouvé");

      return film; // ✅ meilleur que string
    },
  },

  Subscription: {
    filmAjoute: {
      subscribe: () => pubsub.asyncIterableIterator(FILM_AJOUTE),
    },
  },
};

module.exports = resolvers;
