import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql';
import { resolvers } from './graphql/resolvers';
import { connectDatabase } from './database';
import env from './config/env';

const port = env.app.port;
const mount = async (app: Application) => {
  const db = await connectDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  server.start().then((res) => {
    server.applyMiddleware({ app, path: '/api' });
    app.listen(port, function () {
      console.log(`[app]: http://localhost:${port}/`);
    });
  });
};

mount(express());
