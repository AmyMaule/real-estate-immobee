import React from 'react';

const ListingsContainer = ({ listings, noListingsFound }) => {
  if (noListingsFound) {
    return <div className="no-listings-found">No properties found matching your search criteria.</div>
  }

  return (   
     <div className="listings-container">{listings.length}</div>
  )
}

export default ListingsContainer;
