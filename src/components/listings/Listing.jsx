import React, { useState } from 'react';

import ListingImage from './ListingImage';
import SaveListing from './SaveListing';
import HideListing from './HideListing';
import ListingWrapper from './ListingWrapper';
import { capitalize, listingUnavailable } from '../../utilities';

const Listing = ({ listing }) => {
  const hiddenListingIds = JSON.parse(localStorage.getItem("hiddenListingIds")) || [];
  const savedListingIds = JSON.parse(localStorage.getItem("savedListingIds")) || [];
  const [isHidden, setIsHidden] = useState(hiddenListingIds.includes(listing.id));
  const [isSaved, setIsSaved] = useState(savedListingIds.includes(listing.id));
  const [viewRemovedListing, setViewRemovedListing] = useState(false);

  const checkUnlisted = field => field ? field.toLocaleString() : null;
  
  return (
    <ListingWrapper
      isHidden={isHidden}
      listing={listing}
      setIsHidden={setIsHidden}
      setViewRemovedListing={setViewRemovedListing}
      viewRemovedListing={viewRemovedListing}
    >
      {listingUnavailable(listing)
        ? null
        : <>
            <SaveListing
              isSaved={isSaved}
              listing={listing}
              setIsSaved={setIsSaved}
            />
            <HideListing
              isHidden={isHidden}
              listing={listing}
              setIsHidden={setIsHidden}
            />
          </>
      }

      <ListingImage listing={listing} />
      <div className="listing-details-container">
        <div className="listing-row">
          <h5 className="listing-type">{capitalize(listing.property_type)}</h5>
          {listing.price && <h5 className="listing-price">€{listing.price.toLocaleString()}</h5>}
        </div>

        {(listing.bedrooms || listing.rooms) && (
          <div className="listing-row">
            {listing.bedrooms &&
              listing.property_type !== "Terrain" && (
                <h5 className="listing-bedrooms">
                  {listing.bedrooms === 1
                    ? `${listing.bedrooms} bed`
                    : `${listing.bedrooms} beds`}
                  {listing.rooms && <span className="divider">|</span>}
                </h5>
              )}
            {listing.rooms && listing.property_type !== "Terrain" && (
                <h5 className="listing-rooms">
                  {listing.rooms === 1
                    ? `${listing.rooms} room`
                    : `${listing.rooms} rooms`}
                </h5>
              )}
          </div>
        )}

        {(checkUnlisted(listing.building_area_m2) || checkUnlisted(listing.land_area_m2)) && (
          <div className="listing-row listing-icons-container">
            {checkUnlisted(listing.building_area_m2) && (
              <div className="listing-icon-container">
                <img
                  src="/house-size-icon.png"
                  className="listing-icon"
                  alt="house size icon"
                />
                <h5 className="listing-house-size">{checkUnlisted(listing.building_area_m2)} m&#178;</h5>
              </div>
            )}

            {checkUnlisted(listing.land_area_m2) && (
              <div className="listing-icon-container">
                <img
                  src="/forest-icon.png"
                  className="listing-icon"
                  alt="plot size icon"
                />
                <h5 className="listing-plot-size">{checkUnlisted(listing.land_area_m2)} m&#178;</h5>
              </div>
            )}
          </div>
        )}

        {((listing.town ?? listing.location?.commune_name) || listing.postcode) && (
          <div className="listing-row">
            <img src="/location-icon.png" className="listing-icon" alt="location icon" />
            <h5 className="listing-location">
              {listing.postcode
                ? `${listing?.town?.toLowerCase() ??
                    listing.location?.commune_name.toLowerCase()}, ${listing.postcode}`
                : listing?.town?.toLowerCase() ??
                  listing.location?.commune_name.toLowerCase()}
            </h5>
          </div>
        )}
        <div className="listing-row listing-agent-container">
          <h5 className="listing-agent">{listing.source?.agency_name}</h5>
          <h5 className="listing-ref">Ref: {listing.agency_reference ?? "Unavailable"}</h5>
        </div>
      </div>
    </ListingWrapper>
  )
}

export default Listing;
