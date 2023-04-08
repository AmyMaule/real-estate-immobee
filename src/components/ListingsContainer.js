import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import Listing from './Listing';

const ListingsContainer = ({ listings, loadingListings, noListingsFound, setLoadingListings }) => {
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

  useEffect(() => {
    if (listings.length && loadingListings) {
      setLoadingListings(false);
    }
  }, [listings]);

  if (noListingsFound) {
    return (
      <div className="listings-container">
        <div className="no-listings-found">
          No properties found matching your search criteria.
        </div>
      </div>
    )
  }

  if (!listings.length) return null;

  return (   
    <>
      <div className="listings-container">
        {currentPageData}
      </div>
      <div className="pagination-container">
        {listings.length >= 10 && 
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageChange}
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            nextClassName={currentOffset + listingsPerPage >= listings.length ? "hide" : ""}
            previousClassName={currentOffset === 0 ? "hide" : ""}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageRangeDisplayed={5}
            containerClassName="pagination"
            activeClassName="active"
          />
        }
      </div>
    </>
  )
}

export default ListingsContainer;
