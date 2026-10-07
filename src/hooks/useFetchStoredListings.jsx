import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listingsURL } from "../api";
import { 
  defaultPageSize,
  defaultPage,
  defaultSortBy
 } from "../data";

export const useFetchStoredListings = (storageKey, excludeStorageKey = null) => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState({ items: [] });
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || defaultSortBy;
  const page = searchParams.get("page") || defaultPage;
  const pageSize = searchParams.get("page_size") || defaultPageSize;

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

    fetch(`${listingsURL}/batch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listing_ids: listingsToFetch,
        sort: sortBy,
        page: page,
        page_size: pageSize,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [storageKey, excludeStorageKey, page, pageSize, sortBy]);

  return { loading, listings };
}
