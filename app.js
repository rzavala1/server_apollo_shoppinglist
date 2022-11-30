require("dotenv").config();
const express = require("express");
const { apolloServer, ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const { connectDB } = require("./db");
connectDB();

const app = express();

module.exports = app;

async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log("Server on port", process.env.PORT);
  });
}

start();
