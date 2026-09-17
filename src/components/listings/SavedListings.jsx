import React, { useEffect, useState } from 'react';

import { listingsURL } from '../../api';

import ListingsContainer from './ListingsContainer';

const SavedListings = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState({ items: [] });

  useEffect(() => {
    const hiddenListingIds = JSON.parse(localStorage.getItem("hiddenListingIds")) || [];
    const savedListingIds = JSON.parse(localStorage.getItem("savedListingIds")) || [];
    const listingsToFetch = savedListingIds.filter(listingId => !hiddenListingIds.includes(listingId));

    if (!listingsToFetch.length) {
      setLoading(false);
      return;
    }

    Promise.all(listingsToFetch.map(listingId =>
      fetch(`${listingsURL}/${listingId}`)
    ))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        setListings({ items: data });
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