import React, { FunctionComponent } from 'react';
import { server } from '../../lib/api';

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

interface Props {
  title: string;
}

export const Listings: FunctionComponent<Props> = ({ title }) => {
  const fetchListings = async () => {
    const res = await server.fetch({ query: LISTINGS });
    console.log('res', res);
    return res;
  };

  const tag = <h2>{title}</h2>;
  return (
    <div>
      {tag}
      <button onClick={fetchListings}>Query Listings!!!</button>
      {}
    </div>
  );
};
