import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';
import { listings } from './listings';

const app = express();
const port = 9000;

const server = new ApolloServer({ schema });
server.start().then((res) => {
  server.applyMiddleware({ app, path: '/api' });
  app.listen(port, function () {
    console.log(`[app]: http://localhost:${port}/`);
  });
});

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello words');
});

app.get('/mock-listing', (_req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.send(listings);
});

app.post('/delete-listing/:id', (req, res) => {
  const id: string = req.body.id;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  for (let i = 0; i < listings.length; i++) {
    if (listings[i].id === id) {
      return res.send(listings.splice(i, 1));
    }
  }
});
