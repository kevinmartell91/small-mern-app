import React, { FunctionComponent, useEffect, useState } from 'react';
import { server } from '../../lib/api';
import {
  Listing,
  ListingsData,
  DeleteListingData,
  DeleteListingVaribles,
} from './types';
import { useQuery } from '../../lib/api/useQuery';

const LISTINGS = `
    query Listings {
        listings {
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
  const { data, refetch } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVaribles>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {' '}
            {listing.title}{' '}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>{' '}
          </li>
        );
      })}
    </ul>
  ) : null;

  const tag = <h2>{title}</h2>;
  return (
    <div>
      {tag}
      {listingList}
    </div>
  );
};
