import React, { useState } from 'react';

const Listing = ({ listing }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0)

  const getListingDescription = description => {
    if (typeof description === "string") {
      return description.length > 220 ? description.slice(0, 220) : description;
    }
    return description[0].length > 220 ? description[0].slice(0, 220) : description[0];
  }

  const handleChangePhoto = direction => {
    if (direction === "R") {
      if (currentPhoto === listing.photos.length - 1) {
        setCurrentPhoto(0);
      } else setCurrentPhoto(prev => prev + 1);
    } else if (direction === "L") {
      if (currentPhoto === 0) {
        setCurrentPhoto(listing.photos.length - 1);
      } else setCurrentPhoto(prev => prev - 1);
    }
  }

  const checkUnlisted = (field) => {
    return field === null
      ? "Unlisted"
      : field;
  }

  return (
    <div className="listing-container">
      <div className="listing-image-container">
        <div className="img-arrow img-arrow-left" onClick={() => handleChangePhoto("L")}>
          <span>&#x27a4;</span>
        </div>
        <img src={listing.photos[currentPhoto]} alt="listing-image" className="listing-image" id={listing.ref} />
        <div className="img-arrow img-arrow-right" onClick={() => handleChangePhoto("R")}>
          <span>&#x27A4;</span>
        </div>
      </div>
      <div className="listing-details-container">
        <div className="listing-row">
          <h5 className="listing-bedrooms">
            {checkUnlisted(listing.bedrooms)} bedrooms
            <span className="divider">|</span>
          </h5>
          <h5 className="listing-rooms">
          {checkUnlisted(listing.rooms)} rooms
            <span className="divider">|</span>
          </h5>
          <h5 className="listing-price">€{listing.price.toLocaleString()}</h5>
        </div>
        <div className="listing-row listing-icons-container">
          <div className="listing-icon-container">
            <img src="house-size-icon.png" className="listing-icon" alt="house-size" />
            <h5 className="listing-house-size">{checkUnlisted(listing.size)} m&#178;</h5>
          </div>
          <div className="listing-icon-container">
            <img src="forest-icon.png" className="listing-icon" alt="plot-size" />
            <h5 className="listing-plot-size">{checkUnlisted(listing.plot)} m&#178;</h5>
          </div>
        </div>
        <div className="listing-row">
          <h5 className="listing-location">
            {listing.postcode
              ? `${listing.postcode}, ${listing.town}`
              : listing.town
            }
          </h5>
        </div>
        <div className="listing-row listing-description-row">
          <div className="listing-description">
            {getListingDescription(listing.description)}
          </div>
        </div>
        <a className="listing-link" href={listing.link_url} target="_blank">See original listing</a>
        <div className="listing-row listing-agent-container">
          <h5 className="listing-agent">{listing.agent}</h5>
          <h5 className="listing-ref">Ref: {listing.ref}</h5>
        </div>
      </div>
    </div>
  )
}

export default Listing;
