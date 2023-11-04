import React, { useState } from 'react';

import ListingsContainer from './ListingsContainer';

const SavedListings = () => {
  const getSavedListings = () => {
    const allSavedListings = JSON.parse(localStorage.getItem("savedListings")) || [];
    const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings")) || [];
    return allSavedListings.filter(listing => !hiddenListings.includes(listing.listingID));
  }
  const [listings, setListings] = useState(getSavedListings());

  return (
    <div className="saved-listings-page-container">
      <ListingsContainer
        listingIDs={listings}
        noListingsFound={!listings.length}
        setListingIDs={setListings}
      />
    </div>
  )
}

export default SavedListings;
