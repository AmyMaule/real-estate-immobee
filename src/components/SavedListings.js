import React, { useState } from 'react';

import ListingsContainer2 from './ListingsContainer2';

const SavedListings = () => {
  const [listings, setListings] = useState(JSON.parse(localStorage.getItem("listings")));

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ListingsContainer2
      listings={listings}
      noListingsFound={!listings.length}
      setListings={setListings}
    />
  )
}

export default SavedListings;
