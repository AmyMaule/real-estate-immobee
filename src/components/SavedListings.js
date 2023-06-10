import React, { useState } from 'react';

import ListingsContainer from './ListingsContainer';

const SavedListings = () => {
  const [listings, setListings] = useState(JSON.parse(localStorage.getItem("listings")) || []);

  return (
    <div className="saved-listings-page-container">
      <ListingsContainer
        listings={listings}
        noListingsFound={!listings.length}
        setListings={setListings}
      />
    </div>
  )
}

export default SavedListings;
