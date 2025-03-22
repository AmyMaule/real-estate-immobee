import React, { useEffect, useState } from 'react';

import { baseURL } from '../../data';

import ListingsContainer from './ListingsContainer';

const SavedListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings")) || [];
    const allSavedListings = JSON.parse(localStorage.getItem("savedListings")) || [];
    const listingsToFetch = allSavedListings.filter(listing => !hiddenListings.includes(listing.listingID));
    const listingIDsToFetchStr = listingsToFetch.map(listing => listing.listingID).toString();

    // Re-fetch saved listings to only view those still present in the database
    fetch(`${baseURL}/full_listings?id=${listingIDsToFetchStr}`)
      .then(res => res.json())
      .then(data => {
        const validListingIDs = data.map(listing => listing.listingID);
        listingsToFetch.forEach(listing => {
          // Add 'removed' flag to listings that no longer exist in the database
          if (!validListingIDs.includes(listing.listingID)) {
            listing.removedFromDB = true;
          }
        })
        setListings(listingsToFetch);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return null;

  return (
    <div className="saved-listings-page-container">
      <ListingsContainer
        listingIDs={listings}
        noListingsFound={!listings.length}
        setListingIDs={setListings}
      />
    </div>
  )
}

export default SavedListings;
