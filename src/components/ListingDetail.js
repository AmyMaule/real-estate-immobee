import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { scrollTo } from '../utilities';

import ImageControlBar from './ImageControlBar';

const ListingDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const location = useLocation();
  const listingID = location.pathname.slice(10);
  // use location.state when opening the listing in the same tab
  const [listing, setListing] = useState(JSON.parse(localStorage.getItem(listingID)));

  useEffect(() => {
    scrollTo(0, "auto");
  }, []);

  if (!listing) return null;

  return (
    <div className="listing-detail-page-container">
      <div className="listing-detail-img-container">
        <img src={listing.photos_hosted[currentImage]} className="listing-detail-page-img" />
        <ImageControlBar
          currentImage={currentImage}
          listingPhotos={listing.photos_hosted}
          setCurrentImage={setCurrentImage}
        />
      </div>
      <div className="listing-detail-info-container">
        <div className="listing-title-container">
        <h5 className="listing-detail-title">
          {listing.types} in {" "}
          <span className="listing-detail-town">{listing.town?.toLowerCase()}</span>, {listing.postcode}
        </h5>
        <h5 className="listing-detail-price">€{listing.price.toLocaleString()}</h5>
        </div>
        {(listing.bedrooms || listing.rooms) && 
          <h5 className="listing-detail-rooms">
            {listing.bedrooms && 
              <>{listing.bedrooms} bedrooms</>
            }
            {listing.bedrooms && listing.rooms && ", "}
            {listing.rooms && 
              <>{listing.rooms} rooms</>
            }
          </h5>}
        {(listing.size || listing.plot) && 
          <h5 className="listing-detail-rooms">
          {listing.size && 
            <>{listing.size.toLocaleString()} m{String.fromCharCode(178)} property</>
          }
          {listing.size && listing.plot && " with "}
          {listing.plot && 
            <>{listing.plot.toLocaleString()} m{String.fromCharCode(178)} land</>
          }
        </h5>}
        <div>{listing.description?.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}</div>
        <h5 className="listing-detail-agent">Listed with {listing.agent}</h5>
        <div className="listing-link-container">
          <span className="listing-link">
            <a className="listing-link-hover" href={listing.link_url} target="_blank" rel="noreferrer">See original listing</a>
          </span>
          <a className="listing-link-default" href={listing.link_url} target="_blank" rel="noreferrer">See original listing</a>
        </div>

      </div>
    </div>
  )
}

export default ListingDetail;
