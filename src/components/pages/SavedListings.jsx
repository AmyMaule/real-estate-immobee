import React from "react";
import StoredListings from "../listings/StoredListings";

const SavedListings = () => (
  <StoredListings
    listingIdsKey="savedListingIds"
    excludedListingIdsKey="hiddenListingIds"
  />
);

export default SavedListings;
