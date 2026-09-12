import { useEffect } from "react";

export const useFetchListings = (queryURL, setListingIDs, setNoListingsFound, setQueryURL, setSearch) => {
  useEffect(() => {
    if (!queryURL || typeof queryURL !== "string") return;

    fetch(queryURL)
      .then(res => res.json())
      .then(data => {
        const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings")) || [];
        // Sorting listings by most recently added means they are effectively sorted by agent, so use a combination of their id and house size to display them in a way that is somewhat randomized but will always return the same results in the same order
        const sortedListings = data?.items?.length
          ? data.items.filter(listing => !hiddenListings.includes(listing.id))
                .sort((a, b) => a.id * (a.building_area_m2 || 1) < b.id * (b.building_area_m2 || 1) ? 1 : -1)
          : [];

        setListingIDs(sortedListings);
        // save array of shortened listings to local storage
        localStorage.setItem("listingIDs", JSON.stringify(sortedListings));
        // Set lastSearchTime to ensure listings expire after 48 hours
        localStorage.setItem("lastSearchTime", Date.now());
        setNoListingsFound(!sortedListings?.length);
        setQueryURL(null);
        setSearch(false);
      })
      .catch(console.error);
  }, [queryURL, setListingIDs, setNoListingsFound, setQueryURL, setSearch]);
}
