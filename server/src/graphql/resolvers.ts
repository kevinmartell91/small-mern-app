import { listings } from '../listings';

export const resolvers = {
  Query: {
    listings: () => {
      return listings;
    },
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        const listing = listings[i];
        if (listing.id === id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error('Failed to deleted listing');
    },
  },
};
