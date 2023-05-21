import React, { useState } from 'react';

const ListingImage = ({ listing }) => {
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

  return (
    <>
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
                  ? <div className="listing-image-circle-current" key={i} />
                  : <div className="listing-image-circle" key={i} onClick={() => setCurrentPhoto(i)} />
                })}
              <div className="img-arrow img-arrow-right" onClick={() => handleChangePhoto("R")}>
                <span>&#x27A4;</span>
              </div>
            </div>
          </div>
        : <div className="no-images-text">No images available</div>
      }
    </>
  )
}

export default ListingImage;
