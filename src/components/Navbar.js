import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/logo9.png" className="navbar-logo-img" />
          <div className="navbar-logo-text">ImmoBee</div>
          {/* <i className="fa-solid fa-magnifying-glass" /> */}
        </Link>
        <Link to="/search" className="navbar-link">
          Search
          <i className="fa-solid fa-magnifying-glass" />
        </Link>
        <Link to="/saved-listings" className="navbar-link">
          Saved Listings
          <i className="fa-solid fa-house-circle-check" />
        </Link>
      </nav>
      <div className="navbar-height" />
    </>
  )
}

export default Navbar;
