import React from 'react';

import Listing from './Listing';

const ListingsContainer = ({ listings, noListingsFound }) => {
  if (noListingsFound) {
    return <div className="no-listings-found">No properties found matching your search criteria.</div>
  }

  return (   
    <div className="listings-container">
      {listings.map(listing => (
        <Listing
          listing={listing}
          key={listing.id}
        />
      ))}
    </div>
  )
}

export default ListingsContainer;
