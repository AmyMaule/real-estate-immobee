import React, { useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { 
  Link,
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
          top: isSavedListingsPage ? 0 : searchResultsContainerRef.current?.offsetTop - 67 || 0,
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
      .slice(currentOffset, (currentOffset) + 12)
      .map(listing => <Listing listing={listing} key={listing.id} />)
  }

  useEffect(() => {
    if (listings.length || noListingsFound) {
      if (!currentPage) {
        if (!isSavedListingsPage) {
          let timeElapsed = Date.now() - loadingTimer;
          setTimeout(() => {
            navigate("/search/1");
          }, 3500 - timeElapsed);
        } else navigate("/saved-listings/1");
      }

      if (isSavedListingsPage) scrollTo(0, 0);
    }

    // ensure animation plays fully before showing listings
    if ((listings.length || noListingsFound) && loadingListings) {
      let timeElapsed = Date.now() - loadingTimer;

      setTimeout(() => {
        setLoadingListings(false);
        if (searchResultsContainerRef.current) {
          scrollTo(searchResultsContainerRef.current.offsetTop - 67);
        } else if (noListingsRef.current) {
          scrollTo(noListingsRef.current.offsetTop - 67);
        }
      }, 3550 - timeElapsed);
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
              <button className="btn-scroll" onClick={() => scrollTo(0)}>Back to top</button>
            </>
          ) : (
            <>
              <div className="no-listings-found">
                You haven't saved any listings yet.
              </div>
              <Link to="/search" className="link">Search properties</Link>
            </>
          )
        }
      </div>
    )
  }

  if (!listings.length) return null;

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
            pageCount={Math.floor(listings.length / listingsPerPage) + 1}
            onPageChange={handlePageChange}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName={window.innerWidth < 700 ? "hide" : "page-link"}
            nextLinkClassName={window.innerWidth < 700 ? "hide" : "page-link"}
            nextClassName="hide"
            previousClassName="hide"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            marginPagesDisplayed={window.innerWidth < 700 ? 2 : 3}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={currentPage - 1}
          />
        }
      </div>
    </div>
  )
}

export default ListingsContainer;
