import React, { useState } from 'react';

import ListingsContainer from './ListingsContainer';

const SavedListings = () => {
  const [listings, setListings] = useState(JSON.parse(localStorage.getItem("listings")));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ListingsContainer
      listings={listings}
      noListingsFound={!listings.length}
      setListings={setListings}
    />
  )
}

export default SavedListings;
