import { useEffect, useState } from "react";
import { listingsURL } from "../api";

export const useFetchStoredListings = (storageKey, excludeStorageKey = null) => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState({ items: [] });

  useEffect(() => {
    const listingIds = JSON.parse(localStorage.getItem(storageKey)) || [];
    const excludedListingIds = excludeStorageKey
      ? JSON.parse(localStorage.getItem(excludeStorageKey)) || []
      : [];

    const listingsToFetch = listingIds.filter(listingId => !excludedListingIds.includes(listingId));

    if (!listingsToFetch.length) {
      setLoading(false);
      return;
    }

    Promise.all(
      listingsToFetch.map(listingId =>
        fetch(`${listingsURL}/${listingId}`)
      )
    )
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(data => {
        setListings({ items: data });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [storageKey, excludeStorageKey]);

  return { loading, listings };
}
