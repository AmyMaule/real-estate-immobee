import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { 
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import { baseURL } from '../../data';

import { scrollTo } from '../../utilities';

import Listing from './Listing';
import SortingDropdown from './SortingDropdown';

const ListingsContainer = ({ listingIDs, loadingListings, loadingTimer, noListingsFound, setListingIDs, setLoadingListings }) => {
  const [listings, setListings] = useState([]);
  // refHasValue stores whether searchResultsRef.current has a value so the scroll position can be restored
  const [refHasValue, setRefrefHasValue] = useState(false);
  const searchResultsRef = useRef();
  const noListingsRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPage = +useParams().page;  // get currentPage as number
  const listingsPerPage = 12;
  const isSavedListingsPage = location.pathname.startsWith("/saved-listings");
  const currentOffset = (currentPage - 1) * listingsPerPage || 0;

  const handlePageChange = (e) => {
    setListings([]);
    const pageURL = isSavedListingsPage ? "/saved-listings" : "/search";
    
    // add 1 as pagination is zero-indexed
    navigate(`${pageURL}/${e.selected + 1}`);
  }

  useEffect(() => {
    if (!listingIDs?.length) return;

    // On the saved listings page, the entire listing is currently saved instead of the ID
    // No need to re-fetch those listings
    if (isSavedListingsPage) {
      const newListingIDs = listingIDs.slice(currentOffset, currentOffset + 12).map(listing => listing.listingID);
      const currentListingIDs = listings.map(listing => listing.listingID);
      if (JSON.stringify(currentListingIDs) !== JSON.stringify(newListingIDs)) {
        setListings(listingIDs.slice(currentOffset, currentOffset + 12));
      }
      return;
    }

    const fullListingsToFetch = listingIDs
      .slice(currentOffset, currentOffset + 12)
      .map(listing => listing.listingID);

    const listingsToFetchStr = fullListingsToFetch.toString();

    // Don't perform a new query if the new results will be the same as the current results
    const currentFetchedListings = listings.map(listing => listing.listingID).toString();
    if (currentFetchedListings === listingsToFetchStr) return;

    
    fetch(`${baseURL}/full_listings?id=${listingsToFetchStr}`)
      .then(res => res.json())
      .then(data => {
        setListings(data);

        // If a listing has been removed from the database since the last time a search was performed, update the total results
        if (fullListingsToFetch.length !== data.length) {
          const fetchedListingIDs = data.map(listing => listing.listingID)
          // Find the listing(s) that have not been returned from the DB
          const errorListingIDs = fullListingsToFetch.filter(listing => !fetchedListingIDs.includes(listing))
          setListingIDs(prevListingIDs => {
            return prevListingIDs.filter(prevListingID => !errorListingIDs.includes(prevListingID.listingID))
          });
        }
      })
      .catch(err => console.log(err));
  }, [currentOffset, isSavedListingsPage, listingIDs]);


  const renderListings = () => {
    return listings.map(listing => {
      return <Listing listing={listing} key={listing.link_url} />
    });
  };

  useEffect(() => {
    if (listingIDs?.length || noListingsFound) {
      if (!currentPage) {
        if (!isSavedListingsPage) {
          let timeElapsed = Date.now() - loadingTimer;
          setTimeout(() => {
            navigate("/search/1");
          }, 3600 - timeElapsed);
        } else navigate("/saved-listings/1");
      }

      // ensure animation plays fully before showing listings
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
  }, [currentPage, isSavedListingsPage, listingIDs, loadingListings, loadingTimer, navigate, noListingsFound, setLoadingListings]);

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
    if (searchResultsRef.current && refHasValue && listings.length) {
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
  }, [currentPage, isSavedListingsPage, listings, loadingListings, refHasValue]);

  if (noListingsFound) {
    return (
      <div className="no-listings-container" ref={noListingsRef}>
        {location.pathname === "/search/1" ? (
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
              <Link to="/search/1" className="no-listings-link">Search properties</Link>
            </>
          )
        }
      </div>
    )
  }

  if (!isSavedListingsPage && !listingIDs?.length) {
    return null;
  }

  if (listingIDs?.length && (currentPage > Math.ceil(listingIDs?.length / listingsPerPage))) {
    return <Navigate replace to="/error" />
  }

  return (   
    <div className="search-results-container" ref={searchResultsRef}>
      <div ref={refCallback} />
      <div className="listings-title-container">
      {listingIDs?.length && (
          <>
            {renderListings().length > 0 &&
              <h3 className="listings-title">
                Page {currentPage || 1}{"\n"}
                Showing results {currentOffset + 1} - {currentOffset + renderListings().length} of {listingIDs?.length}
              </h3>
            }
            <SortingDropdown
              listingIDs={listingIDs}
              setListingIDs={setListingIDs}
            />
          </>
        )}
      </div>

      <div className="listings-container">
        {renderListings()}
      </div>
      <div className="pagination-container">
        {listingIDs?.length >= 10 && 
          <ReactPaginate
            activeClassName="active"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            forcePage={currentPage ? currentPage - 1 : null}
            marginPagesDisplayed={window.innerWidth < 700 ? 2 : 3}
            nextClassName="hide"
            nextLinkClassName={window.innerWidth < 700 ? "hide" : "page-link"}
            onPageChange={handlePageChange}
            pageClassName="page-item"
            pageCount={Math.ceil(listingIDs.length / listingsPerPage)}
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
