import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { propertyTypeMapping } from '../../data';

import ListingImage from './ListingImage';
import SaveListing from './SaveListing';
import HideListing from './HideListing';
import ListingWrapper from './ListingWrapper';

const Listing = ({ listing }) => {
  const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings")) || [];
  const [isHidden, setIsHidden] = useState(hiddenListings.includes(listing.listingID));
  const [isSaved, setIsSaved] = useState(
    JSON.parse(localStorage.getItem("savedListings"))?.some(savedListing => savedListing?.listingID === listing.listingID) || null
  );
  const [viewRemovedListing, setViewRemovedListing] = useState(false);
  const navigate = useNavigate();

  const handleMiddleClick = e => {
    if (e.button === 1) handleSelectListing(e);
  }

  // ensure listing is only selected if other buttons on the listing are not clicked
  const handleSelectListing = (e) => {
    const otherTargets = ["slick-arrow", "listing-image-circle", "listing-image-current", "listing-interactive-icon-container", "heart-icon", "eye-icon"];
    const classNames = e.target.classList;
    
    for (let className of classNames) {
      if (otherTargets.indexOf(className) !== -1) {
        // e.button === 0 is a left click
        if (e.button === 0 && !e.ctrlKey) {
          e.preventDefault();
        }
        return;
      }
    }
    
    // if user left clicks, open listing in current tab using navigate
    // if they middle or right click to open in new tab, set the listing in local storage to retrieve in new tab
    if (e.button === 0 && !e.ctrlKey) {
      e.preventDefault();
      window.history.pushState({ prevPage: "listing" }, '');
      navigate(`/listings/${listing.listingID}`, { state: listing });
    } else {
      localStorage.setItem(listing.listingID, JSON.stringify(listing));
    }
    localStorage.setItem("scrollPosition", window.scrollY);
  }

  const getPropertyType = type => {
    for (let key in propertyTypeMapping) {
      if (propertyTypeMapping[key] === type) return key;
    }
  }

  const checkUnlisted = field => field ? field.toLocaleString() : null;

  return (
    <ListingWrapper
      handleMiddleClick={handleMiddleClick}
      handleSelectListing={handleSelectListing}
      isHidden={isHidden}
      listing={listing}
      setIsHidden={setIsHidden}
      setViewRemovedListing={setViewRemovedListing}
      viewRemovedListing={viewRemovedListing}
    >
      {viewRemovedListing
        ? <div className="listing-interactive-icon-container listing-save-container" onClick={() => setViewRemovedListing(false)}>
            <i className="fa-solid fa-xmark x-icon" />
          </div>
        : listing.removedFromDB 
          ? null
          : <>
              <SaveListing isSaved={isSaved} listing={listing} setIsSaved={setIsSaved} />
              <HideListing isHidden={isHidden} listing={listing} setIsHidden={setIsHidden} />
            </>
      }
      
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
    </ListingWrapper>
  )
}

export default Listing;
