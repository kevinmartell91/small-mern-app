import { MongoClient, Collection } from 'mongodb';
import { Database, Listing } from '../lib/types';
import env from '../config/env';

const user = env.mongodb.user;
const password = env.mongodb.password;
const cluster = env.mongodb.cluster;
const url =
  env.mongodb.url &&
  env.mongodb.url
    .replace('<user>', user as string)
    .replace('<password>', password as string)
    .replace('<cluster>', cluster as string);

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url as string, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  const db = client.db('main');

  return {
    listings: db.collection('test_listings'),
  };

  // return db.collection<Listing>('test_listings');
};
