import React from 'react';
import { 
  Link,
  useLocation
} from 'react-router-dom';

import { scrollTo } from '../utilities';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" className="navbar-logo-img" alt="logo" />
          <div className="navbar-logo-text">ImmoBee</div>
        </Link>
        {currentPage.startsWith("/search")
          ? <div className={`navbar-link ${currentPage.startsWith("/search") ? "current-page" : ""}`} onClick={scrollTo}>
              Search
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          : <Link to="/search/1" className={`navbar-link ${currentPage.startsWith("/search") ? "current-page" : ""}`}>
              Search
              <i className="fa-solid fa-magnifying-glass" />
            </Link>
        }
        {currentPage.startsWith("/saved-listings")
          ? <div className={`navbar-link ${currentPage.startsWith("/saved-listings") ? "current-page" : ""}`} onClick={scrollTo}>
              Saved Listings
              <i className="fa-solid fa-house-circle-check" />
            </div>
          : <Link to="/saved-listings/1" className={`navbar-link ${currentPage.startsWith("/saved-listings") ? "current-page" : ""}`}>
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
