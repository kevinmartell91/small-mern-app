import { ObjectId, Collection } from 'mongodb';

export interface Listing {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface Database {
  listings: Collection<Listing>;
}

// const identity = (age: number): number => {
//   return num;
// };

// const identity = (arg: number | string): number | string => {
//   return arg;
// };

// const identity = (age: any) => {
//   return num;
// };

// interface IdetityObj<T> {
//   field: T;
// }

// const identity = <T>(arg: T): T => {
//   // typing constrain the obj to a pariticular interface
//   const obj: IdetityObj<T> = {
//     field: arg,
//   };
//   return obj.field;
// };
