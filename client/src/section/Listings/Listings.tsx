import { FunctionComponent } from 'react';

import { useQuery, useMutation, gql } from '@apollo/react-hooks';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';

import { Alert, Avatar, Button, List, Spin } from 'antd';
import styled from 'styled-components';
import './';

import { ListingsSkeleton } from './components';
import './styles/Listings.css';

const ListContainer = styled.div`
  margin: 20px;
  max-width: 750px;
`;

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
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return (
      <ListContainer>
        <ListingsSkeleton title={title} />
      </ListContainer>
    );
  }
  if (error) {
    return (
      <ListContainer>
        <ListingsSkeleton title={title} error />
      </ListContainer>
    );
  }

  const deleteListingErrorAlert = deleteListingError ? (
    <Alert
      type="error"
      message="Ug oh! Something went wrong with deleting"
      className="listings__alert"
    />
  ) : null;

  return (
    <ListContainer>
      {deleteListingErrorAlert}
      <h2>{title}</h2>
      {listingList}
      <Spin spinning={deleteListingLoading} tip="Deleting" />
    </ListContainer>
  );
};
