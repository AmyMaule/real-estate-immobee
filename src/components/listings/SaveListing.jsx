import React from "react";

const SaveListing = ({ isSaved, listing, setIsSaved }) => {
  const handleToggleLike = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(prevSaved => !prevSaved);
    const savedListingIds = JSON.parse(localStorage.getItem("savedListingIds"));

    if (savedListingIds?.length) {
      if (isSaved) {
        const filteredListingIds = savedListingIds.filter(id => id !== listing.id);
        localStorage.setItem("savedListingIds",  JSON.stringify([...filteredListingIds]));
      } else {
        localStorage.setItem("savedListingIds", JSON.stringify([...savedListingIds, listing.id]));
      }
    } else {
      localStorage.setItem("savedListingIds", JSON.stringify([listing.id]));
    }
  }


  return (
    <div className="listing-interactive-icon-container listing-save-container" onClick={handleToggleLike} >
      <i className={`fa-regular fa-heart heart-icon ${isSaved ? "saved" : ""}`} />
      <div className={`${isSaved ? "heart-dot saved" : "heart-dot"}`}></div>
    </div>
  )
}

export default SaveListing;
