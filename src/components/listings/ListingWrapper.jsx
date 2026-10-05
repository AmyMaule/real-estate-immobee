import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { listingUnavailable } from '../../utilities';
import HiddenListing from './HiddenListing';

const ListingWrapper = ({ children, isHidden, listing, setIsHidden, setViewRemovedListing, viewRemovedListing }) => {
  // displayListing is false if a listing is marked as not active/under offer
  // and the user removes it from their saved listings
  const [displayListing, setDisplayListing] = useState(true);
  const isRemoved = listingUnavailable(listing);
  const isClickable = !isRemoved || viewRemovedListing;
  const isHiddenListingsPage = location.pathname === "/hidden-listings";

  const handleUnsaveListing = () => {
    const savedListingIds = JSON.parse(localStorage.getItem("savedListingIds")) || [];
    const filteredListingIds = savedListingIds.filter(id => id !== listing.id);
    localStorage.setItem("savedListingIds", JSON.stringify(filteredListingIds));
    setDisplayListing(false);
  };

  const handleViewRemovedListing = e => {
    e.preventDefault();
    e.stopPropagation();
    setViewRemovedListing(true);
  };

  const handleRemoveListing = e => {
    e.preventDefault();
    e.stopPropagation();
    handleUnsaveListing();
  };

  if (!displayListing) return null;

  if (isHidden && !isHiddenListingsPage) return (
    <HiddenListing
      listing={listing}
      action={location.pathname === "/hidden-listings" ? "unhide" : "hide"}
      setIsHidden={setIsHidden}
    >
      {children}
    </HiddenListing>
  )

  if (!isHidden && isHiddenListingsPage) return (
    <HiddenListing
      listing={listing}
      action="unhide"
      setIsHidden={setIsHidden}
    >
      {children}
    </HiddenListing>
  )

  if (!isClickable) {
    return (
      <div className="listing-container listing-container-hidden">
        <div className="listing-hidden-info-container">
          This listing has been removed by the agent. You can view the
          original listing, or remove it from your saved listings.
          <button
            className="btn btn-undo btn-removed-listing"
            onClick={handleViewRemovedListing}
          >
            <i className="fa-solid fa-eye" />
            View listing
          </button>
          <button
            className="btn btn-undo btn-removed-listing"
            onClick={handleRemoveListing}
          >
            <i className="fa-solid fa-trash" />
            Remove listing
          </button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <Link
      className={`listing-container
        ${isRemoved ? "listing-container-hidden" : ""}
        ${viewRemovedListing ? "show-removed-listing-container" : ""}
      `}
      onClick={() => {
        window.history.replaceState(
          { ...window.history.state, scrollPosition: window.scrollY },
          ""
        );
      }}
      to={`/listings/${listing.id}`}
    >
      {viewRemovedListing && (
        <div
          className="listing-interactive-icon-container listing-save-container"
          onClick={handleViewRemovedListing}
        >
          <i className="fa-solid fa-xmark x-icon" />
        </div>
      )}
      {children}
    </Link>
  );
};

export default ListingWrapper;
