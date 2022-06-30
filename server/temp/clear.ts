require('dotenv').config();
import { connectDatabase } from '../src/database';

const clear = async () => {
  try {
    const db = await connectDatabase();

    const users = await db.users.find({}).toArray();
    const listings = await db.listings.find({}).toArray();
    const bookings = await db.bookings.find({}).toArray();

    if (users.length > 0) await db.users.drop();
    if (listings.length > 0) await db.listings.drop();
    if (bookings.length > 0) await db.bookings.drop();

    console.log('[ droped ] : success');
  } catch (error) {
    throw new Error('Failed to drop database');
  }
};

clear();
