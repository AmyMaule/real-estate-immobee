import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';

import Listing from './Listing';
import SortingDropdown from './SortingDropdown';

const ListingsContainer = ({ listings, loadingListings, loadingTimer, noListingsFound, setListings, setLoadingListings }) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const searchResultsContainerRef = useRef();
  const noListingsRef = useRef();
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
      behavior: (listings.length - newOffset < 9 || window.innerWidth < 860) ? "auto" : "smooth",
    });
  };

  const handleScroll = ref => {
    window.scrollTo({
      top: ref.current.offsetTop - 24,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    // reset page to zero when listings change
    setCurrentOffset(0);

    // ensure animation plays fully before showing listings
    if ((listings.length || noListingsFound) && loadingListings) {
      let timeElapsed = Date.now() - loadingTimer;

      setTimeout(() => {
        setLoadingListings(false);
        if (searchResultsContainerRef.current) {
          handleScroll(searchResultsContainerRef);
        } else if (noListingsRef.current) {
          handleScroll(noListingsRef);
        }
      }, 3600 - timeElapsed);
    }
  }, [listings]);

  if (noListingsFound) {
    return (
      <div className="listings-container" ref={noListingsRef}>
        <div className="no-listings-found">
          No properties found matching your search criteria.
        </div>
      </div>
    )
  }

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
            previousLabel={window.innerWidth < 800 ? "Prev" : "Previous"}
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName={window.innerWidth < 700 ? "hide" : "page-link"}
            nextLinkClassName={window.innerWidth < 700 ? "hide" : "page-link"}
            nextClassName={currentOffset + listingsPerPage >= listings.length ? "hide" : ""}
            previousClassName={currentOffset === 0 ? "hide" : ""}
            breakClassName="page-item"
            breakLinkClassName="page-link"
            marginPagesDisplayed={window.innerWidth < 700 ? 2 : 3}
            containerClassName="pagination"
            activeClassName="active"
          />
        }
      </div>
    </div>
  )
}

export default ListingsContainer;
