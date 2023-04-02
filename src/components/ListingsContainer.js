import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import Listing from './Listing';

const ListingsContainer = ({ listings, noListingsFound }) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const listingsPerPage = 10;

  const currentPageData = listings
    .slice(currentOffset, currentOffset + listingsPerPage)
    .map(listing => <Listing listing={listing} key={listing.id} />);
  const pageCount = Math.ceil(listings.length / listingsPerPage);

  const handlePageChange = e => {
    const newOffset = (e.selected * listingsPerPage) % listings.length;
    setCurrentOffset(newOffset);
  };

  if (noListingsFound) {
    return <div className="no-listings-found">No properties found matching your search criteria.</div>
  }

  if (!listings.length) return null;

  return (   
    <>
      <div className="listings-container">
        {currentPageData}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={handlePageChange}
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  )
}

export default ListingsContainer;
