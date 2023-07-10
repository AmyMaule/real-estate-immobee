import React, { useState } from 'react';

import ListingsContainer from './ListingsContainer';

const SavedListings = () => {
  const [listings, setListings] = useState(JSON.parse(localStorage.getItem("savedListings")) || []);

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
