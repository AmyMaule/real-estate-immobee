import React from 'react';

const HideListing = ({ listing }) => {
  const [isHidden, setIsHidden] = React.useState(false);

  const handleToggleHide = () => {
    setIsHidden(prev => !prev);
    const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings"));
        
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
      <i className={`${isHidden ? "fa-solid fa-rotate-left" : "fa-regular fa-trash-can"} trash-icon`} />
      <span className="tooltiptext">
        {isHidden
          ? "Unhide this listing"
          : "Hide this listing so you won't see it in future searches"
        }
        </span>
    </div>
  )
}

export default HideListing;
