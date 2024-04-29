import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { baseURL } from '../data';
import { scrollTo } from '../utilities';

import ImageControlSlider from './ImageControlSlider';
import SaveListing from './SaveListing';

const ListingDetail = () => {
  const location = useLocation();
  const listingID = location.pathname.slice(10);
  // use location.state when opening the listing in the same tab
  const [listing, setListing] = useState(location.state || JSON.parse(localStorage.getItem(listingID)) || undefined);
  const [isSaved, setIsSaved] = useState(
    JSON.parse(localStorage.getItem("savedListings"))?.some(savedListing => savedListing?.link_url === listing?.link_url) || null
  );

  // Delete local storage item once accessed
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(listingID)) && listing) {
      localStorage.removeItem(listingID);
    }
  }, []);

  // If the listing page has been shared or copied to another browser, there will be nothing in state or local storage
  useEffect(() => {
    if (!listing) {
      fetch(`${baseURL}/full_listings?id=${listingID}`)
      .then(res => res.json())
      .then(data => setListing(data[0] || null))
      .catch(err => console.log(err));
    }
  }, [listing, listingID]);

  useEffect(() => {
    scrollTo(0, "auto");
  }, []);

  // If there is no listing associated with the listingID, navigate to error page
  if (listing === null) {
    return <Navigate replace to="/error" />
  }

  // If the fetch request is still completing, return null temporarily
  if (!listing) return null;

  return (
    <div className="listing-detail-page-container">
      <div className="listing-detail-save-container">
        <SaveListing isSaved={isSaved} listing={listing} setIsSaved={setIsSaved} />
      </div>
      {listing.photos_hosted?.length
        ? <ImageControlSlider listingPhotos={listing.photos_hosted} />
        : <div className="listing-detail-no-images-container">
            <img src="/image-not-found.png" className="listing-detail-page-img" alt="listing" />
            <div className="listing-detail-no-images">No images available</div>
          </div>
      }
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
            {listing.bedrooms && <>{listing.bedrooms} bedrooms</>}
            {listing.bedrooms && listing.rooms && ", "}
            {listing.rooms && <>{listing.rooms} rooms</>}
          </h5>
        }
        {(listing.size || listing.plot) && 
          <h5 className="listing-detail-rooms">
            {listing.size && <>{listing.size.toLocaleString()} m{String.fromCharCode(178)} property</>}
            {listing.size && listing.plot && " with "}
            {listing.plot && <>{listing.plot.toLocaleString()} m{String.fromCharCode(178)} land</>}
          </h5>
        }
        {listing.description &&
          <div>
            {listing.description?.map((paragraph, i) => (
              <p key={i} className="listing-detail-description">{paragraph}</p>
            ))}
          </div>
        }
        <h5 className="listing-detail-agent">Listed with {listing.agent}, ref: {listing.ref}</h5>
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
