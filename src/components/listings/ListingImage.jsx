import React from 'react';

import { mediaURL } from '../../api';

import ImageControlSlider from './ImageControlSlider';

const ListingImage = ({ listing }) => {
  return (
    <>
      {listing.hosted_images?.length
        ? <div className="listing-image-container">
            <>
              {listing.hosted_images.length === 1
                ? <>
                    <img
                      alt="listing images"
                      className="listing-image"
                      src={`${mediaURL}${listing.hosted_images[0].url}`}
                    />
                    <div className="listing-solo-image-bee-container">
                      <img src="/bee-4.png" className="listing-image-current" alt="" />
                    </div>
                  </>
                : <div className="listing-image-slider-container">
                    <ImageControlSlider listingPhotos={listing.hosted_images} />
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
