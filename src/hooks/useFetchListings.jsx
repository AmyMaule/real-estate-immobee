import { useEffect } from "react";

export const useFetchListings = (queryURL, setlistingsData, setNoListingsFound) => {
  useEffect(() => {
    if (!queryURL || typeof queryURL !== "string") return;
    
    fetch(queryURL)
      .then(res => res.json())
      .then(data => {
        // listingData also stores information about pagination
        setlistingsData(data);

        //// TODO: still expire results?
        // Set lastSearchTime to ensure listings expire after 48 hours
        localStorage.setItem("lastSearchTime", Date.now());
        setNoListingsFound(!data?.items?.length);
      })
      .catch(console.error);
  }, [queryURL, setlistingsData, setNoListingsFound]);
}
