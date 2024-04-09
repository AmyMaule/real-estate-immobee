import React, { useContext } from 'react';
import { 
  Link,
  useLocation
} from 'react-router-dom';

import { handlePageChange, scrollTo } from '../utilities';

import HamburgerMenu from './HamburgerMenu';

import { ListingsContext } from '..';

const Navbar = () => {
  const { setListingIDs } = useContext(ListingsContext);
  const location = useLocation();
  const currentPage = location.pathname;

  const handleClick = scrollBehavior => {
    handlePageChange(setListingIDs, scrollBehavior);
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={() => handleClick("auto")}>
          <img src="/logo.png" className="navbar-logo-img" alt="logo" />
          <div className="navbar-logo-text">ImmoBee</div>
        </Link>
        {currentPage.startsWith("/search")
          ? <div className={`navbar-link ${currentPage.startsWith("/search") ? "current-page" : ""}`} onClick={scrollTo}>
              Search
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          : <Link
              className={`navbar-link ${currentPage.startsWith("/search") ? "current-page" : ""}`}
              onClick={() => handleClick("smooth")}
              to="/search/1"
            >
              Search
              <i className="fa-solid fa-magnifying-glass" />
            </Link>
        }
        {currentPage.startsWith("/saved-listings")
          ? <div className={`navbar-link ${currentPage.startsWith("/saved-listings") ? "current-page" : ""}`} onClick={scrollTo}>
              Saved Listings
              <i className="fa-solid fa-house-circle-check" />
            </div>
          : <Link
              className={`navbar-link ${currentPage.startsWith("/saved-listings") ? "current-page" : ""}`}
              onClick={() => handleClick("auto")}
              to="/saved-listings/1"
            >
              Saved Listings
              <i className="fa-solid fa-house-circle-check" />
            </Link>
        }
        <HamburgerMenu />
      </nav>
      <div className="navbar-height" />
    </>
  )
}

export default Navbar;
