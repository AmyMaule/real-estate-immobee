import { useEffect, useState } from 'react';

import { listingsURL } from '../../api';

import ListingsContainer from './ListingsContainer';

const SavedListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings")) || [];
    const allSavedListings = JSON.parse(localStorage.getItem("savedListings")) || [];
    const listingsToFetch = allSavedListings.filter(listing => !hiddenListings.includes(listing.id));

    // Re-fetch saved listings to only view those still present in the database
    for (let listing of listingsToFetch) {
      const listingIDToFetch = listing.id;
      fetch(`${listingsURL}/${listingIDToFetch}`)
      .then(res => {
        console.log(res)
        return res.json()
      })
        // .then(res => res.json())
        .then(data => {
          const validListingIDs = data.map(listing => listing.id);
          listingsToFetch.forEach(listing => {
            // Add 'removed' flag to listings that no longer exist in the database
            if (!validListingIDs.includes(listing.id)) {
              listing.removedFromDB = true;
            }
          })
          setListings(listingsToFetch);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
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
