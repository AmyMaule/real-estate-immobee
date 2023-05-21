import React, { useRef } from 'react';

import { propertyTypeMapping } from '../data';

import ListingImage from './ListingImage';

const Listing = ({ listing }) => {
  const heartRef = useRef();
  const dotRef = useRef();

  const getPropertyType = type => {
    for (let key in propertyTypeMapping) {
      if (propertyTypeMapping[key] === type) return key;
    }
  }

  const checkUnlisted = field => field ? field.toLocaleString() : null;

  const handleToggleLike = () => {
    heartRef.current.classList.toggle("saved");
    dotRef.current.classList.toggle("saved");
  }

  return (
    <div className="listing-container">
      <div className="listing-save-container" onClick={handleToggleLike} >
        <i className="fa-regular fa-heart heart-icon" ref={heartRef} />
        <div className="heart-dot" ref={dotRef}></div>
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
              <img src="house-size-icon.png" className="listing-icon" alt="house size icon" />
              <h5 className="listing-house-size">{checkUnlisted(listing.size)} m&#178;</h5>
            </div>}
          
          {checkUnlisted(listing.plot) &&
            <div className="listing-icon-container">
              <img src="forest-icon.png" className="listing-icon" alt="plot size icon" />
              <h5 className="listing-plot-size">{checkUnlisted(listing.plot)} m&#178;</h5>
            </div>}
        </div>}

        {(listing.town || listing.postcode) && 
          <div className="listing-row">
          <img src="location-icon.png" className="listing-icon" alt="location icon" />
          <h5 className="listing-location">
            {listing.postcode
              ? `${listing?.town?.toLowerCase()}, ${listing.postcode}`
              : listing?.town?.toLowerCase()
            }
          </h5>
        </div>}

        <div className="listing-link-container">
          <span className="listing-link">
            <a className="listing-link-hover" href={listing.link_url} target="_blank" rel="noreferrer">View original listing</a>
          </span>
          <a className="listing-link-default" href={listing.link_url} target="_blank" rel="noreferrer">View original listing</a>
        </div>

        <div className="listing-row listing-agent-container">
          <h5 className="listing-agent">{listing.agent}</h5>
          <h5 className="listing-ref">Ref: {listing.ref}</h5>
        </div>
      </div>
    </div>
  )
}

export default Listing;
