import React from 'react';

import ImageControlSlider from './ImageControlSlider';

const ListingImage = ({ listing }) => {
  return (
    <>
      {listing.photos_hosted.length
        ? <div className="listing-image-container">
            <>
              {listing.photos_hosted.length === 1
                ? <>
                    <img
                      alt="listing images"
                      className="listing-image"
                      src={listing.photos_hosted[0]}
                    />
                    <div className="listing-solo-image-bee-container">
                      <img src="/bee-4.png" className="listing-image-current" alt="" />
                    </div>
                  </>
                : <div className="listing-image-slider-container">
                    <ImageControlSlider listingPhotos={listing.photos_hosted} />
                  </div>
              }
            </>
          </div>
        : <div className="no-images-text">No images available</div>
      }
    </>
  )
}

export default ListingImage;
