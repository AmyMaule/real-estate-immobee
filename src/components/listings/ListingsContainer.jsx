import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { 
  Link,
  Navigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

import { scrollTo } from '../../utilities';

import Listing from './Listing';
import SortingDropdown from './SortingDropdown';

const ListingsContainer = ({ listingsData, loadingListings, loadingTimer, noListingsFound, setLoadingListings }) => {
  // refHasValue stores whether searchResultsRef.current has a value so the scroll position can be restored
  const [refHasValue, setRefrefHasValue] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchResultsRef = useRef();
  const noListingsRef = useRef();
  const location = useLocation();
  const isSavedListingsPage = location.pathname.startsWith("/saved-listings");
  const currentOffset = (listingsData?.page - 1) * listingsData?.page_size;

  const handlePageChange = (e) => {
    const newPage = e.selected + 1;

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  };

  const renderListings = () => {
    return listingsData?.items?.map(listing => {
      return <Listing listing={listing} key={listing.id} />
    });
  };

  // ensure animation plays fully before showing listings
  useEffect(() => {
    if (listingsData?.items?.length || noListingsFound) {
      if (loadingListings && !isSavedListingsPage) {
        let timeElapsed = Date.now() - loadingTimer;
        setTimeout(() => {
          setLoadingListings(false);
          if (searchResultsRef.current) {
            scrollTo(searchResultsRef.current.offsetTop  - 63);
          } else if (noListingsRef.current) {
            scrollTo(noListingsRef.current.offsetTop  - 63);
          }
        }, 3600 - timeElapsed);
      }
    }
  }, [isSavedListingsPage, listingsData, loadingListings, loadingTimer, noListingsFound, setLoadingListings]);

  useEffect(() => {
    if (noListingsFound && noListingsRef.current) {
      setTimeout(() => {
        scrollTo(noListingsRef.current.offsetTop - 63);
      }, 0);
    }
  }, [noListingsFound]);

  // when the user clicks on a listing and returns to search results, return to their original scrolling position
  const returnToScrollPosition = () => {
    // retrieve scroll position when the user clicked on the listing from local storage
    const prevScrollPosition = Number(localStorage.getItem("scrollPosition")) || 0;
    scrollTo(prevScrollPosition, "auto");
  };

  // Callback ref to set refHasValue to the DOM node in the search results container as long as it has a value
  const refCallback = useCallback((node) => {
    if (node !== null) {
      setRefrefHasValue(node);
    }
  }, []);

  useEffect(() => {
    // If the user hits the back button on the listing detail page, return them to their previous scroll position
    if (searchResultsRef.current && refHasValue && listingsData?.items?.length) {
      if (window.history.state?.prevPage) {
        if (window.history.state.prevPage === "listing") {
          window.history.pushState({ prevPage: "" }, "");
          returnToScrollPosition();
        }
      } else {
        // When the page changes, scroll smoothly to the top of the new page of listings
        if (!loadingListings) {
          setTimeout(() => {
            window.scrollTo({
              top: isSavedListingsPage ? 0 : searchResultsRef.current?.offsetTop - 63 || noListingsRef?.current?.offsetTop  - 63 || 0,
              behavior: "smooth",
            });
          }, 0);
        }
      }
    }
  }, [listingsData?.page, isSavedListingsPage, listingsData, loadingListings, refHasValue]);

  if (noListingsFound) {
    return (
      <div className="no-listings-container" ref={noListingsRef}>
        {location.pathname === "/search" ? (
            <>
              <div className="no-listings-found">
                No properties found matching your search criteria.
              </div>
              <button className="no-listings-link" onClick={() => scrollTo(0)}>Back to top</button>
            </>
          ) : (
            <>
              <div className="no-listings-found">
                You haven't saved any listings yet.
              </div>
              <Link to="/search" className="no-listings-link">Search properties</Link>
            </>
          )
        }
      </div>
    )
  }

  if (!isSavedListingsPage && !listingsData?.items?.length) {
    return null;
  }

  // If the current page is too high for the number of listings
  if (listingsData?.items?.length && (listingsData?.page > Math.ceil(listingsData.total / listingsData.page_size))) {
    return <Navigate replace to="/error" />
  }

  return (   
    <div className="search-results-container" ref={searchResultsRef}>
      <div ref={refCallback} />
      <div className="listings-title-container">
      {listingsData?.items?.length && (
          <>
            {renderListings().length > 0 &&
              <h3 className="listings-title">
                Page {listingsData?.page || 1}{"\n"}
                Showing results {currentOffset + 1} - {currentOffset + renderListings().length} of {listingsData?.total}
              </h3>
            }
            <SortingDropdown />
          </>
        )}
      </div>

      <div className="listings-container">
        {renderListings()}
      </div>
      <div className="pagination-container">
        {listingsData?.items?.length &&
          <ReactPaginate
            activeClassName="active"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            forcePage={(listingsData?.page || 1) - 1}
            marginPagesDisplayed={window.innerWidth < 700 ? 2 : 3}
            nextClassName="hide"
            nextLinkClassName={window.innerWidth < 700 ? "hide" : "page-link"}
            onPageChange={handlePageChange}
            pageClassName="page-item"
            pageCount={Math.ceil(listingsData.total / listingsData.page_size)}
            pageLinkClassName="page-link"
            previousClassName="hide"
            previousLinkClassName={window.innerWidth < 700 ? "hide" : "page-link"}
          />
        }
      </div>
    </div>
  )
}

export default ListingsContainer;
