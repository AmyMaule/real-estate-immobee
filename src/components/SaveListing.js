import React from "react";

const SaveListing = ({ isSaved, listing, setIsSaved }) => {
  const handleToggleLike = () => {
    setIsSaved(prevSaved => !prevSaved);
    const savedListings = JSON.parse(localStorage.getItem("savedListings"));
    
    if (savedListings?.length) {
      if (isSaved) {
        const filteredListings = savedListings.filter(savedListing => savedListing.link_url !== listing.link_url);
        localStorage.setItem("savedListings",  JSON.stringify([...filteredListings]));
      } else {
        localStorage.setItem("savedListings", JSON.stringify([...savedListings, listing]));
      }
    } else {
      localStorage.setItem("savedListings", JSON.stringify([listing]));
    }
  }

  return (
    <div className="listing-interactive-icon-container" onClick={handleToggleLike} >
      <i className={`fa-regular fa-heart heart-icon ${isSaved ? "saved" : ""}`} />
      <div className={`${isSaved ? "heart-dot saved" : "heart-dot"}`}></div>
    </div>
  )
}

export default SaveListing;
