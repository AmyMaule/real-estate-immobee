import React, { useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import { 
  Link,
  Navigate,
  useLocation,
  useNavigationType,
  useSearchParams,
} from 'react-router-dom';

import { scrollTo } from '../../utilities';
import Listing from './Listing';
import SortingDropdown from './SortingDropdown';
import ListingSkeleton from './ListingSkeleton';

const ListingsContainer = ({ listingsData, loadingListings, loadingTimer, noListingsFound, setLoadingListings }) => {
  const [, setSearchParams] = useSearchParams();
  const searchResultsRef = useRef();
  const location = useLocation();
  const navigationType = useNavigationType();
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

  const renderSkeletons = () => {
    return Array.from({ length: listingsData?.page_size || 24 }).map((_, index) => (
      <ListingSkeleton key={index} />
    ));
  };

  // ensure animation plays fully before showing listings
  useEffect(() => {
    if (listingsData?.items?.length || noListingsFound) {
      if (loadingListings && !isSavedListingsPage) {
        let timeElapsed = Date.now() - loadingTimer;
        setTimeout(() => {
          setLoadingListings(false);
        }, 3600 - timeElapsed);
      }
    }
  }, [isSavedListingsPage, listingsData, loadingListings, loadingTimer, noListingsFound, setLoadingListings]);

  useEffect(() => {
    // Restore scroll position if returning to search results after viewing listing detail
    if (navigationType === "POP" && window.history.state?.scrollPosition !== undefined) {
      scrollTo(window.history.state.scrollPosition, "auto");
      return;
    }
    
    // Scroll to top of listings container after the initial search or when pagination has loaded the new page
    if (!loadingListings && (listingsData?.items?.length || noListingsFound) && location.search) {
      scrollTo(searchResultsRef.current?.offsetTop - 63);
    }
  }, [loadingListings, listingsData?.page, location.search, navigationType, noListingsFound]);

  if (noListingsFound) {
    return (
      <div className="no-listings-container" ref={searchResultsRef}>
        {location.pathname === "/search" ? (
            <>
              <div className="no-listings-found">
                No properties found matching your search criteria.
              </div>
              <button className="no-listings-link" onClick={scrollTo}>Back to top</button>
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

  // If the current page is too high for the number of listings
  if (listingsData?.items?.length && (listingsData?.page > Math.ceil(listingsData.total / listingsData.page_size))) {
    return <Navigate replace to="/error" />
  }

  return (   
    <div className="search-results-container" ref={searchResultsRef}>
      <div className="listings-title-container">
        <h3 className="listings-title">
          {listingsData?.page 
            ? (
              <>
                Page {listingsData?.page || 1}{"\n"}
                Showing results {currentOffset + 1} - {currentOffset + (listingsData?.page_size || 24)} of {listingsData?.total}
              </>
            )
            : <>Loading results</>
          }
        </h3>
        {listingsData?.items?.length > 0 && <SortingDropdown />}
      </div>

      <div className="listings-container">
        {listingsData?.items?.length
          ? renderListings()
          : renderSkeletons()
        }
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
