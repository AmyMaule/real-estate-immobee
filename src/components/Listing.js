import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { propertyTypeMapping } from '../data';

import ListingImage from './ListingImage';

const Listing = ({ listing }) => {
  // link_url is the unique identifier for each listing
  const [isSaved, setIsSaved] = useState(
    JSON.parse(localStorage.getItem("listings"))?.some(savedListing => savedListing?.link_url === listing.link_url) || null
  );
  const heartRef = useRef();
  const dotRef = useRef();
  const navigate = useNavigate();

  const handleMiddleClick = e => {
    if (e.button === 1) handleSelectListing(e);
  }

  // ensure listing is only selected if other buttons on the listing are not clicked
  const handleSelectListing = (e) => {
    const otherTargets = ["img-arrow", "img-arrow-glyph", "listing-image-circle", "listing-image-current", "listing-save-container", "heart-icon"];
    const classNames = e.target.classList;
    // e.button === 0 is a left click
    if (e.button === 0 && !e.ctrlKey) {
      for (let className of classNames) {
        if (otherTargets.indexOf(className) !== -1) {
          e.preventDefault();
          return;
        }
      }
    }

    if (e.button === 0 && !e.ctrlKey) {
      e.preventDefault();
      navigate(`/listings/${listing.ref}`, { state: listing });
    } else {
      localStorage.setItem(listing.ref, JSON.stringify(listing));
    }
  }

  const getPropertyType = type => {
    for (let key in propertyTypeMapping) {
      if (propertyTypeMapping[key] === type) return key;
    }
  }

  const checkUnlisted = field => field ? field.toLocaleString() : null;

  const handleToggleLike = () => {
    setIsSaved(prevSaved => !prevSaved);
    heartRef.current.classList.toggle("saved");
    dotRef.current.classList.toggle("saved");

    const savedListings = JSON.parse(localStorage.getItem("listings"));
    
    if (savedListings?.length) {
      if (isSaved) {
        const filteredListings = savedListings.filter(savedListing => savedListing.link_url !== listing.link_url);
        localStorage.setItem("listings",  JSON.stringify([...filteredListings]));
      } else {
        localStorage.setItem("listings", JSON.stringify([...savedListings, listing]));
      }
    } else {
      localStorage.setItem("listings", JSON.stringify([listing]));
    }
  }

  return (
    <a 
      className="listing-container"
      href={`/listings/${listing.ref}`}
      onContextMenu={handleSelectListing}
      onClick={handleSelectListing}
      onMouseDown={handleMiddleClick}
    >
      <div className="listing-save-container" onClick={handleToggleLike} >
        <i className={`fa-regular fa-heart heart-icon ${isSaved ? "saved" : ""}`} ref={heartRef} />
        <div className={`${isSaved ? "heart-dot saved" : "heart-dot"}`} ref={dotRef}></div>
      </div>
      <ListingImage listing={listing} />
      <div className="listing-details-container">
        <div className="listing-row">
          <h5 className="listing-type">
            {getPropertyType(listing.types)}
          </h5>
          <h5 className="listing-price">€{listing.price.toLocaleString()}</h5>
        </div>

        {(checkUnlisted(listing.bedrooms) || checkUnlisted(listing.rooms)) &&
          <div className="listing-row">
            {checkUnlisted(listing.bedrooms) && listing.types !== "Terrain" &&
              <h5 className="listing-bedrooms">
                {checkUnlisted(listing.bedrooms) === "1"
                  ? `${checkUnlisted(listing.bedrooms)} bed`
                  : `${checkUnlisted(listing.bedrooms)} beds`
                }
                {checkUnlisted(listing.rooms) && <span className="divider">|</span>}
              </h5>}
            {checkUnlisted(listing.rooms) && listing.types !== "Terrain" &&
              <h5 className="listing-rooms">
                {checkUnlisted(listing.rooms) === "1"
                  ? `${checkUnlisted(listing.rooms)} room`
                  : `${checkUnlisted(listing.rooms)} rooms`
                }
              </h5>}
          </div>}

        {(checkUnlisted(listing.size) || checkUnlisted(listing.plot)) &&
        <div className="listing-row listing-icons-container">
          {checkUnlisted(listing.size) &&
            <div className="listing-icon-container">
              <img src="/house-size-icon.png" className="listing-icon" alt="house size icon" />
              <h5 className="listing-house-size">{checkUnlisted(listing.size)} m&#178;</h5>
            </div>}
          
          {checkUnlisted(listing.plot) &&
            <div className="listing-icon-container">
              <img src="/forest-icon.png" className="listing-icon" alt="plot size icon" />
              <h5 className="listing-plot-size">{checkUnlisted(listing.plot)} m&#178;</h5>
            </div>}
        </div>}

        {(listing.town || listing.postcode) && 
          <div className="listing-row">
          <img src="/location-icon.png" className="listing-icon" alt="location icon" />
          <h5 className="listing-location">
            {listing.postcode
              ? `${listing?.town?.toLowerCase()}, ${listing.postcode}`
              : listing?.town?.toLowerCase()
            }
          </h5>
        </div>}
        <div className="listing-row listing-agent-container">
          <h5 className="listing-agent">{listing.agent}</h5>
          <h5 className="listing-ref">Ref: {listing.ref}</h5>
        </div>
      </div>
    </a>
  )
}

export default Listing;
