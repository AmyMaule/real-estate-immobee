import React from 'react';

const HideListing = ({ isHidden, listing, setIsHidden }) => {
  const hiddenListingIds = JSON.parse(localStorage.getItem("hiddenListingIds")) || [];

  const handleToggleHide = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsHidden(prev => !prev);
    if (hiddenListingIds?.length) {
      if (isHidden) {
        const filteredListings = hiddenListingIds.filter(hiddenListing => hiddenListing !== listing.id);
        localStorage.setItem("hiddenListingIds",  JSON.stringify([...filteredListings]));
      } else {
        localStorage.setItem("hiddenListingIds", JSON.stringify([...hiddenListingIds, listing.id]));
      }
    } else {
      localStorage.setItem("hiddenListingIds", JSON.stringify([listing.id]));
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
