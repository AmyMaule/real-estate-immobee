import React, { useState } from 'react';

const Listing = ({ listing }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const handleChangePhoto = direction => {
    if (direction === "R") {
      if (currentPhoto === listing.photos_hosted.length - 1) {
        setCurrentPhoto(0);
      } else setCurrentPhoto(prev => prev + 1);
    } else if (direction === "L") {
      if (currentPhoto === 0) {
        setCurrentPhoto(listing.photos_hosted.length - 1);
      } else setCurrentPhoto(prev => prev - 1);
    }
  }

  const checkUnlisted = field => field ? field.toLocaleString() : null;

  return (
    <div className="listing-container">
      {listing.photos_hosted.length
       ? <div className="listing-image-container">
            <img
              alt="listing images"
              className="listing-image"
              src={listing.photos_hosted[currentPhoto]}
            />

          <div className="listing-image-control-bar">
            <div className="img-arrow img-arrow-left" onClick={() => handleChangePhoto("L")}>
              <span>&#x27a4;</span>
            </div>
            {listing.photos_hosted.map((photo, i) => {
              if ((window.innerWidth < 410 && i > 9) || i > 14) return null;
              return i === currentPhoto
                ? <div className="listing-image-circle listing-image-circle-current" key={i}>{"\u2022"}</div>
                : <div className="listing-image-circle" onClick={() => setCurrentPhoto(i)} key={i}>{"\u2022"}</div>
              })}
            <div className="img-arrow img-arrow-right" onClick={() => handleChangePhoto("R")}>
              <span>&#x27A4;</span>
            </div>
          </div>
        </div>
      : <div className="no-images-text">No images available</div>}

      <div className="listing-details-container">
        <div className="listing-row">
          <h5 className="listing-type">
            {listing.types}
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
