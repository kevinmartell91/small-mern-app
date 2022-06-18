interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export type ListingsData = {
  listings: Listing[];
};

export type DeleteListingData = {
  deleteListing: Listing;
};

export type DeleteListingVaribles = {
  id: string;
};
