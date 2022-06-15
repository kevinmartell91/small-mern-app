import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';

const app = express();
const port = 9000;

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then((res) => {
  server.applyMiddleware({ app, path: '/api' });
  app.listen(port, function () {
    console.log(`[app]: http://localhost:${port}/`);
  });
});
