import React from 'react';

const ListingWrapper = ({ children, handleMiddleClick, handleSelectListing, isHidden, listing, setIsHidden }) => {
  const handleUnhideListing = () => {
    const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings"));
    const filteredListings = hiddenListings.filter(hiddenListing => hiddenListing !== listing.listingID);
    localStorage.setItem("hiddenListings",  JSON.stringify([...filteredListings]));
    setIsHidden(false);
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
