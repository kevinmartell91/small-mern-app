import { FunctionComponent } from 'react';

import { useQuery, useMutation, gql } from '@apollo/react-hooks';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';
// import { gql, } from "@apollo/client";

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Body {
  title: string;
}

export const Listings: FunctionComponent<Body> = ({ title }) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  const [
    deleteListings,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListings({ variables: { id } });
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
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete
            </button>{' '}
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading ... </h2>;
  }
  if (error) {
    return <h2>Uh oh something went wrong !! Please try again later</h2>;
  }
  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h2> Deletion in progress</h2>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>Ug oh! Something went wrong with deleting</h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
