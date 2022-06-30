import { MongoClient } from 'mongodb';
import { Database, User, Listing, Booking } from '../lib/types';
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
  const client = await MongoClient.connect(url as string, {});
  const db = client.db('main');

  return {
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
    bookings: db.collection<Booking>('bookings'),
  };
};
