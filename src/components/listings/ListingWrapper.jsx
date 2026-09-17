import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { listingUnavailable } from '../../utilities';

const ListingWrapper = ({ children, isHidden, listing, setIsHidden, setViewRemovedListing, viewRemovedListing }) => {
  // displayListing is false if a listing is marked as not active/under offer
  // and the user removes it from their saved listings
  const [displayListing, setDisplayListing] = useState(true);
  const isRemoved = listingUnavailable(listing);
  const isClickable = !isRemoved || viewRemovedListing;

  const handleUnhideListing = () => {
    const hiddenListingIds = JSON.parse(localStorage.getItem("hiddenListingIds")) || [];
    const filteredListingIds = hiddenListingIds.filter(id => id !== listing.id);
    localStorage.setItem("hiddenListingIds", JSON.stringify(filteredListingIds));
    setIsHidden(false);
  };

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

  const handleCloseRemovedListing = e => {
    e.preventDefault();
    e.stopPropagation();
    setViewRemovedListing(false);
  };

  const handleRemoveListing = e => {
    e.preventDefault();
    e.stopPropagation();
    handleUnsaveListing();
  };

  if (!displayListing) return null;

  if (isHidden) {
    return (
      <div className="listing-container listing-container-hidden">
        <div className="listing-hidden-info-container">
          You have hidden this listing. This means you will not see this
          listing in future search results.
          <button className="btn btn-undo" onClick={handleUnhideListing}>
            <i className="fa-solid fa-rotate-left undo-icon" />
            Undo
          </button>
        </div>
        {children}
      </div>
    )
  }

  if (!isClickable) {
    return (
      <div
        className="listing-container listing-container-hidden"
      >
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
      to={`/listings/${listing.id}`}
    >
      {viewRemovedListing && (
        <div
          className="listing-interactive-icon-container listing-save-container"
          onClick={handleCloseRemovedListing}
        >
          <i className="fa-solid fa-xmark x-icon" />
        </div>
      )}
      {children}
    </Link>
  );
};

export default ListingWrapper;
