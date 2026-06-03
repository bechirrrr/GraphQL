require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const cors = require("cors");

const connectDB = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const startServer = async () => {
  // Connexion à la base de données
  await connectDB();

  const app = express();
  const httpServer = createServer(app);

  // Configuration du schéma GraphQL
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Configuration du serveur WebSocket pour les Subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  // Configuration d'Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  // Application des middlewares Express
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Serveur GraphQL prêt sur http://localhost:${PORT}/graphql`);
    console.log(`📡 Subscriptions prêtes sur ws://localhost:${PORT}/graphql`);
  });
};

startServer();
