import { ObjectId, Collection } from 'mongodb';

export enum ListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
}

export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndex;
  price: number;
  numOfGuests: number;
}
export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
}

export interface Booking {
  _id: ObjectId;
  listing: ObjectId;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export interface Database {
  listings: Collection<Listing>;
  users: Collection<User>;
  bookings: Collection<Booking>;
}

export interface BookingsIndexMonth {
  [key: string]: boolean;
}
export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth;
}
export interface BookingsIndex {
  [key: string]: BookingsIndexYear;
}
// BookingsIndex follows this structure
// const data: BookingsIndex = {
//   // year
//   '2012': {
//     // month March
//     '02': {
//       '20': false,
//       '21': false,
//       '22': true, // day avilable
//       '23': false,
//     },
//     // month April
//     '03': {
//       '11': false, // day not availble
//       '12': true,
//       '13': true,
//       '14': true,
//       '15': true,
//     },
//   },
// };
