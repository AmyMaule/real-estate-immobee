import React from 'react';

const HideListing = ({ isHidden, listing, setIsHidden }) => {
  const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings")) || [];

  const handleToggleHide = () => {
    setIsHidden(prev => !prev);
    if (hiddenListings?.length) {
      if (isHidden) {
        const filteredListings = hiddenListings.filter(hiddenListing => hiddenListing !== listing.listingID);
        localStorage.setItem("hiddenListings",  JSON.stringify([...filteredListings]));
      } else {
        localStorage.setItem("hiddenListings", JSON.stringify([...hiddenListings, listing.listingID]));
      }
    } else {
      localStorage.setItem("hiddenListings", JSON.stringify([listing.listingID]));
    }
  }

  return (
    <div className="listing-interactive-icon-container listing-hide-container" onClick={handleToggleHide}>
      <i className="fa-regular fa-eye-slash eye-icon" />
      <span className="tooltip-text">Hide this listing so you won't see it in future searches</span>
    </div>
  )
}

export default HideListing;
