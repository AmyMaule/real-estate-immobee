import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';

import Listing from './Listing';
import SortingDropdown from './SortingDropdown';

const ListingsContainer = ({ listings, loadingListings, noListingsFound, setListings, setLoadingListings }) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const searchResultsContainerRef = useRef();
  const listingsPerPage = window.innerWidth > 1274 ? 12 : 10;

  const currentPageData = listings
    .slice(currentOffset, currentOffset + listingsPerPage)
    .map(listing => <Listing listing={listing} key={listing.id} />);
  const pageCount = Math.ceil(listings.length / listingsPerPage);

  const handlePageChange = e => {
    const newOffset = (e.selected * listingsPerPage) % listings.length;
    setCurrentOffset(newOffset);

    // the last page of results doesn't smooth scroll if it is not full height
    window.scrollTo({
      top: searchResultsContainerRef.current.offsetTop - 24,
      behavior: listings.length - newOffset < 9 ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    // reset page to zero when listings change
    setCurrentOffset(0);

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

  console.log(listings[0])

  if (!listings.length) return null;

  return (   
    <div className="search-results-container" ref={searchResultsContainerRef}>
      <div className="listings-title-container">
      <h3 className="listings-title">
        Showing results {currentOffset + 1} - {currentOffset + currentPageData.length} of {listings.length}
      </h3>
      <SortingDropdown listings={listings} setListings={setListings} />
      </div>

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
    </div>
  )
}

export default ListingsContainer;
