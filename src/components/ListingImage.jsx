import React, { useState } from 'react';

const ListingImage = ({ listing }) => {
  return (
    <>
      {listing.photos_hosted.length
        ? <div className="listing-image-container">
            <img
              alt="listing images"
              className="listing-image"
              src={listing.photos_hosted[0]}
            />
          </div>
        : <div className="no-images-text">No images available</div>
      }
    </>
  )
}

export default ListingImage;
