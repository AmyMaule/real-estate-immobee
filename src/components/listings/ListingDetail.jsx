import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { listingsURL } from '../../api';
import { capitalize, scrollTo } from '../../utilities';

import FullScreenIcon from './FullScreenIcon';
import ImageControlSlider from './ImageControlSlider';
import SaveListing from './SaveListing';

const ListingDetail = () => {
  const location = useLocation();
  const listingID = location.pathname.slice(10);
  const [listing, setListing] = useState();

  const [isSaved, setIsSaved] = useState(
    JSON.parse(localStorage.getItem("savedListings"))?.some(savedListing => savedListing?.url === listing?.url) || null
  );
  const [showRemovedListingBanner, setShowRemovedListingBanner] = useState(listing?.availability !== "active" || false);

  useEffect(() => {
    if (!listing) {
      fetch(`${listingsURL}/${listingID}`)
      .then(res => res.json())
      .then(data => setListing(data || null))
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
      {showRemovedListingBanner && 
      <div className="listing-detail-banner-container">
          <div className="listing-detail-banner">
            <div className="listing-detail-banner-content">
              NOTE: This listing has been removed and as a result, has been archived in your browser.
              {"\n"}You can continue to view this page but cannot send a link to others or view it on another device.
            </div>
            <button className="btn-x" onClick={() => setShowRemovedListingBanner(false)}>
              <i className="fa-solid fa-xmark banner-x-icon" />
            </button>
          </div>
        </div>
      }
      <div className="listing-detail-save-container">
        <SaveListing isSaved={isSaved} listing={listing} setIsSaved={setIsSaved} />
        <FullScreenIcon listingPhotos={listing.hosted_images} />
      </div>
      {listing.hosted_images?.length
        ? <div className="listing-detail-image-slider-container">
            <ImageControlSlider 
              isDetailedListing
              listingPhotos={listing.hosted_images} 
            />
          </div>
        : <div className="listing-detail-no-images-container">
            <img src="/image-not-found.png" className="listing-detail-page-img" alt="listing" />
            <div className="listing-detail-no-images">No images available</div>
          </div>
      }
      <div className="listing-detail-info-container">
        <div className="listing-title-container">
        <h5 className="listing-detail-title">
          {listing.property_type ? capitalize(listing.property_type) : "Property"} in {" "}
          <span className="listing-detail-town">
            {listing.town?.toLowerCase() ?? listing.location?.commune_name?.toLowerCase()}
          </span>, {listing.postcode}
        </h5>
        {listing.price && <h5 className="listing-detail-price">€{listing.price.toLocaleString()}</h5>}
        </div>
        {(listing.bedrooms || listing.rooms) && 
          <h5 className="listing-detail-rooms">
            {listing.bedrooms && <>{listing.bedrooms} bedrooms</>}
            {listing.bedrooms && listing.rooms && ", "}
            {listing.rooms && <>{listing.rooms} rooms</>}
          </h5>
        }
        {(listing.building_area_m2 || listing.land_area_m2) && 
          <h5 className="listing-detail-rooms">
            {listing.building_area_m2 && <>{listing.building_area_m2.toLocaleString()} m{String.fromCharCode(178)} property</>}
            {listing.building_area_m2 && listing.land_area_m2 && " with "}
            {listing.land_area_m2 && <>{listing.land_area_m2.toLocaleString()} m{String.fromCharCode(178)} land</>}
          </h5>
        }
        {listing.description &&
          <div>
            {listing.description}
            {/* {listing.description?.map((paragraph, i) => (
              <p key={i} className="listing-detail-description">{paragraph}</p>
            ))} */}
          </div>
        }
        {listing.source && 
          <h5 className="listing-detail-agent">Listed with {listing.source.agency_name}
          , ref: {listing.agency_reference ?? "unknown"}</h5>
        }
        <div className="listing-link-container">
          <span className="listing-link">
            <a className="listing-link-hover" href={listing.url} target="_blank" rel="noreferrer">See original listing</a>
          </span>
          <a className="listing-link-default" href={listing.url} target="_blank" rel="noreferrer">See original listing</a>
        </div>

      </div>
    </div>
  )
}

export default ListingDetail;
