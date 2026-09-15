import React, { useEffect, useState } from 'react';

import { listingsURL } from '../../api';

import ListingsContainer from './ListingsContainer';

const SavedListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState({ items: [] });

  useEffect(() => {
    const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings")) || [];
    const allSavedListings = JSON.parse(localStorage.getItem("savedListings")) || [];
    const listingsToFetch = allSavedListings.filter(listing => !hiddenListings.includes(listing.id));

    if (!listingsToFetch.length) {
      setLoading(false);
      return;
    }

    Promise.all(
      listingsToFetch.map(listing =>
        fetch(`${listingsURL}/${listing.id}`)
          .then(res => res.json())
          .then(data => {
            if (!data?.id) {
              return {
                ...listing,
                removedFromDB: true
              };
            }
            return listing;
          })
      )
    )
      .then(results => {
        setListings({ items: results });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <div className="saved-listings-page-container">
      <ListingsContainer
        listingsData={listings}
        noListingsFound={!listings.items.length}
      />
    </div>
  );
};

export default SavedListings;