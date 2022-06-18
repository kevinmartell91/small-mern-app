import React, { FunctionComponent } from 'react';
import { server } from '../../lib/api';
import {
  ListingsData,
  DeleteListingData,
  DeleteListingVaribles,
} from './types';

const LISTINGS = `
    query Listings {
        listingss {
            id
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            numOfBaths
            rating        
        }
    }
`;

const DELETE_LISTING = `
    mutation DeleteListing ($id: ID!) {
      deleteListing (id: $id) {
        id
      }
    }
`;

interface Body {
  title: string;
}

export const Listings: FunctionComponent<Body> = ({ title }) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    return data.listings;
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVaribles
    >({
      query: DELETE_LISTING,
      variables: {
        id: '62abb2ac866b6930f368eb1b',
      },
    });
    return data.deleteListing;
  };

  const tag = <h2>{title}</h2>;
  return (
    <div>
      {tag}
      <button onClick={fetchListings}>Query Listings!!!</button>
      <button onClick={deleteListing}>Delete Listing</button>
      {}
    </div>
  );
};
