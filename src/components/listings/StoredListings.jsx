import React from "react";

import ListingsContainer from "../listings/ListingsContainer";
import { useFetchStoredListings } from "../../hooks/useFetchStoredListings";

const StoredListings = ({ listingIdsKey, excludedListingIdsKey }) => {
  const { loading, listings } = useFetchStoredListings(
    listingIdsKey,
    excludedListingIdsKey
  );

  if (loading) return null;

  return (
    <div className="saved-listings-page-container">
      <ListingsContainer
        listingsData={listings}
        noListingsFound={!listings.items.length}
      />
    </div>
  );
};

export default StoredListings;
