import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const hamburgerRef = useRef();

  const toggleHamburger = e => {
    e.target.closest(".navbar-hamburger-container").querySelector(".hamburger-menu-container").classList.toggle("open");
  }

  const handleCloseDropdown = e => {
    const hamburgerContainerDOM = e.target.closest(".navbar-hamburger-container");

    // if click originated outside the hamburger menu, close it
    if (!hamburgerContainerDOM && hamburgerRef.current.classList.contains("open")) {
      hamburgerRef.current.classList.remove("open")
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);
    return () => document.removeEventListener("click", handleCloseDropdown);
  }, []);


  return (
    <div className="navbar-hamburger-container" onClick={toggleHamburger}>
      <i className="fa-solid fa-bars navbar-hamburger" />
      <div className="hamburger-menu-container" ref={hamburgerRef}>
        <div className="hamburger-menu">
          <Link to="/search" className="hamburger-menu-item">
            Search
          </Link>
          <Link to="/saved-listings/1" className="hamburger-menu-item">
            Saved Listings
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HamburgerMenu;
