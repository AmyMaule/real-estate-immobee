import React, { useRef } from "react";

const SaveListing = ({ isSaved, listing, setIsSaved }) => {
  const heartRef = useRef();
  const dotRef = useRef();

  const handleToggleLike = () => {
    setIsSaved(prevSaved => !prevSaved);
    heartRef.current.classList.toggle("saved");
    dotRef.current.classList.toggle("saved");

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
    <div className="listing-save-container" onClick={handleToggleLike} >
      <i className={`fa-regular fa-heart heart-icon ${isSaved ? "saved" : ""}`} ref={heartRef} />
      <div className={`${isSaved ? "heart-dot saved" : "heart-dot"}`} ref={dotRef}></div>
    </div>
  )
}

export default SaveListing;
