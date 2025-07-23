import { useEffect } from "react";

// Default expiry to 48 hours ago
export const useExpireListingIDs = (expiryMs = 48 * 60 * 60 * 1000) => {
  useEffect(() => {
    const currentTime = Date.now();
    const lastSearchTime = localStorage.getItem("lastSearchTime");

    if (lastSearchTime && Number(lastSearchTime) < currentTime - expiryMs) {
      console.log("Search results too old, removing listingIDs")
      localStorage.removeItem("lastSearchTime");
      localStorage.removeItem("listingIDs");
    }
  }, [expiryMs]);
}
