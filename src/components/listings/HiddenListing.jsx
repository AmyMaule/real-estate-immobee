import React from 'react'

const HiddenListing = ({ children, listing, action, setIsHidden }) => {
  const handleUnhideListing = () => {
    const hiddenListingIds = JSON.parse(localStorage.getItem("hiddenListingIds")) || [];
    const filteredListingIds = hiddenListingIds.filter(id => id !== listing.id);
    localStorage.setItem("hiddenListingIds", JSON.stringify(filteredListingIds));
    setIsHidden(false);
  };

  const handleHideListing = () => {
    const hiddenListingIds = JSON.parse(localStorage.getItem("hiddenListingIds")) || [];
    localStorage.setItem("hiddenListingIds", JSON.stringify([...hiddenListingIds, listing.id]));
    setIsHidden(true);
  };

  return (
    <div className="listing-container listing-container-hidden">
      <div className="listing-hidden-info-container">
        {action === "unhide"
          ? "You have unhidden this listing. It will appear in future search results."
          : "You have hidden this listing. This means you will not see this listing in future search results."
        }
        <button
          className="btn btn-undo" 
          onClick={action === "hide" ? handleUnhideListing : handleHideListing}
        >
          <i className="fa-solid fa-rotate-left undo-icon" />
          Undo
        </button>
      </div>
      {children}
    </div>
  )
}

export default HiddenListing;
