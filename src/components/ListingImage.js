import React, { useState } from 'react';

import ImageControlBar from './ImageControlBar';

const ListingImage = ({ listing }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      {listing.photos_hosted.length
        ? <div className="listing-image-container">
            <img
              alt="listing images"
              className="listing-image"
              src={listing.photos_hosted[currentImage]}
            />
            <ImageControlBar
              currentImage={currentImage}
              listingPhotos={listing.photos_hosted}
              maxImages={14}
              setCurrentImage={setCurrentImage}
            />
          </div>
        : <div className="no-images-text">No images available</div>
      }
    </>
  )
}

export default ListingImage;
