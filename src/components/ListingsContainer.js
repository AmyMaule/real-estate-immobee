import React, { useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { 
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import { scrollTo } from '../utilities';

import Listing from './Listing';
import SortingDropdown from './SortingDropdown';

const ListingsContainer = ({ listings, loadingListings, loadingTimer, noListingsFound, setListings, setLoadingListings }) => {
  const searchResultsContainerRef = useRef();
  const noListingsRef = useRef();
  const listingsPerPage = 12;
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = +useParams().page;  // get currentPage as number
  const isSavedListingsPage = location.pathname.startsWith("/saved-listings");
  const currentOffset = (currentPage - 1) * listingsPerPage;

  useEffect(() => {
    if (!loadingListings) {
      setTimeout(() => {
        window.scrollTo({
          top: isSavedListingsPage ? 0 : searchResultsContainerRef.current?.offsetTop + 1 || 0,
          behavior: "auto",
        });
      }, 0);
    }
  }, [currentPage]);

  const handlePageChange = (e) => {
    const baseURL = isSavedListingsPage ? "/saved-listings" : "/search";
    
    // add 1 as pagination is zero-indexed
    navigate(`${baseURL}/${e.selected + 1}`);
    renderListings();
  }

  const renderListings = () => {
    return listings
      .slice(currentOffset, currentOffset + 12)
      .map(listing => (
        <Listing listing={listing} key={listing.link_url} />
      ));
  };


  useEffect(() => {
    if (listings.length || noListingsFound) {
      if (!currentPage) {
        if (!isSavedListingsPage) {
          let timeElapsed = Date.now() - loadingTimer;
          setTimeout(() => {
            navigate("/search/1");
          }, 3650 - timeElapsed);
        } else navigate("/saved-listings/1");
      }

      if (isSavedListingsPage) scrollTo();
    }

    // ensure animation plays fully before showing listings
    if ((listings.length || noListingsFound) && loadingListings) {
      let timeElapsed = Date.now() - loadingTimer;

      setTimeout(() => {
        setLoadingListings(false);
        if (searchResultsContainerRef.current) {
          scrollTo(searchResultsContainerRef.current.offsetTop + 1);
        } else if (noListingsRef.current) {
          scrollTo(noListingsRef.current.offsetTop + 1);
        }
      }, 3650 - timeElapsed);
    }
  }, [listings]);

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
              <Link to="/search" className="no-listings-link">Search properties</Link>
            </>
          )
        }
      </div>
    )
  }

  if (!listings.length) return null;

  if (currentPage > Math.ceil(listings.length / listingsPerPage)) {
    return <Navigate replace to="/error" />
  }

  return (   
    <div className="search-results-container" ref={searchResultsContainerRef}>
      <div className="listings-title-container">
      <h3 className="listings-title">
        Page {currentPage}{"\n"}
        Showing results {currentOffset + 1} - {currentOffset + renderListings().length} of {listings.length}
      </h3>
      <SortingDropdown listings={listings} setListings={setListings} />
      </div>

      <div className="listings-container">
        {renderListings()}
      </div>
      <div className="pagination-container">
        {listings.length >= 10 && 
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
            pageCount={Math.ceil(listings.length / listingsPerPage)}
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
