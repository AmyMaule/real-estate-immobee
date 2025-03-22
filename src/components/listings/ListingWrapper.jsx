import React, { useState } from 'react';

const ListingWrapper = ({ children, handleMiddleClick, handleSelectListing, isHidden, listing, setIsHidden, setViewRemovedListing, viewRemovedListing }) => {
   // displayListing will be false if a listing has been removed from the DB and the user also clicks to remove it from saved
  const [displayListing, setDisplayListing] = useState(true);

  const handleUnhideListing = () => {
    const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings"));
    const filteredListings = hiddenListings.filter(hiddenListing => hiddenListing !== listing.listingID);
    localStorage.setItem("hiddenListings",  JSON.stringify([...filteredListings]));
    setIsHidden(false);
  }

  const deleteRemovedFromDBListing = () => {
    const savedListings = JSON.parse(localStorage.getItem("savedListings"));
    localStorage.setItem("savedListings", JSON.stringify(
      savedListings.filter(savedListing => savedListing.listingID !== listing.listingID)
    ));
    setDisplayListing(false);
  }

  if (!displayListing) {
    return null;
  }

  if (isHidden) {
    return (
      <div className="listing-container listing-container-hidden">
        <div className="listing-hidden-info-container">
          You have hidden this listing. This means you will not see this listing in future search results.
          <button className="btn btn-undo" onClick={handleUnhideListing}>
            <i className="fa-solid fa-rotate-left undo-icon" />
            Undo
          </button>
        </div>
        {children}
      </div>
    )
  }

  if (listing.removedFromDB) {
    return (
      <div className={`listing-container listing-container-hidden ${viewRemovedListing ? "show-removed-listing-container" : ""}`}>
        <div className="listing-hidden-info-container">
          This listing has been removed by the agent. You can view the original listing, or remove it from your saved listings.
          <button className="btn btn-undo btn-removed-listing" onClick={() => setViewRemovedListing(true)}>
            <i className="fa-solid fa-eye"></i>
            View listing
          </button>
          <button className="btn btn-undo btn-removed-listing" onClick={deleteRemovedFromDBListing}>
            <i className="fa-solid fa-trash"></i>
            Remove listing
          </button>
        </div>
        {children}
      </div>
    )
  } 

  return (
    <a
      className="listing-container"
      href={`/listings/${listing.listingID}`}
      onContextMenu={handleSelectListing}
      onClick={handleSelectListing}
      onMouseDown={handleMiddleClick}
    >
      {children}
    </a>
  )
}

export default ListingWrapper;
