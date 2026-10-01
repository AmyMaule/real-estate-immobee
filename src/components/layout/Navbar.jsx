import React from 'react';
import { Link } from 'react-router-dom';

import HamburgerMenu from './HamburgerMenu';
import NavbarLink from './NavbarLink';

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" className="navbar-logo-img" alt="logo" />
          <div className="navbar-logo-text">ImmoBee</div>
        </Link>
        <NavbarLink
          path="/search"
          label="Search"
          icon="fa-magnifying-glass"
        />
        <NavbarLink
          path="/saved-listings"
          label="Saved Listings"
          icon="fa-house-circle-check"
        />
        <NavbarLink
          path="/hidden-listings"
          label="Hidden Listings"
          icon="fa-eye-slash"
        />
        <HamburgerMenu />
      </nav>
      <div className="navbar-height" />
    </>
  )
}

export default Navbar;
