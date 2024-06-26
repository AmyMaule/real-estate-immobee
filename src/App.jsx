import React, { useState, useEffect, useContext } from "react";

import { baseURL } from './data';

import { getSearchURL } from "./utilities";

import { ListingsContext } from ".";

import ListingsContainer from "./components/listings/ListingsContainer";
import LoadingAnimation from "./components/pages/LoadingAnimation";
import SearchForm from "./components/searchForm/SearchForm";

const App = () => {
  const [agentChoices, setAgentChoices] = useState({});
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [noListingsFound, setNoListingsFound] = useState(false);
  const [queryURL, setQueryURL] = useState();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const { listingIDs, setListingIDs } = useContext(ListingsContext);

  // Delete previous search results if more than 2 days old
  useEffect(() => {
    const currentTime = new Date();
    var dateOffset = (24 * 60 * 60 *1000) * 2;
    const date48HoursAgo = currentTime.getTime() - dateOffset;

    const lastSearchTime = localStorage.getItem("lastSearchTime")
    if (!lastSearchTime) return;

    if (Number(lastSearchTime) < date48HoursAgo) {
      console.log("Search results too old, removing listingIDs")
      localStorage.removeItem("lastSearchTime")
      localStorage.removeItem("listingIDs")
    }
  }, []);

  useEffect(() => {
    if (!noListingsFound && !listingIDs?.length) {
      setListingIDs(JSON.parse(localStorage.getItem("listingIDs")));
    }
  }, [listingIDs?.length, noListingsFound, setListingIDs]);

  useEffect(() => {
    if (typeof queryURL === "string") {
      fetch(baseURL + queryURL)
        .then(res => res.json())
        .then(data => {
          const hiddenListings = JSON.parse(localStorage.getItem("hiddenListings")) || [];
          // Sorting listings by most recently added means they are effectively sorted by agent, so to display them in a way that is somewhat randomized but will always return the same results in the same order, sort them using a combination of their listingID and house size
          const sortedListings = data?.length 
            ? data
                .filter(listing => !hiddenListings.includes(listing.listingID))
                .sort((a, b) => a.listingID * (a.size || 1) < b.listingID * (b.size || 1) ? 1 : -1) 
            : [];
          setListingIDs(sortedListings);
          // save array of shortened listings to local storage
          localStorage.setItem("listingIDs", JSON.stringify(sortedListings));
          // Set lastSearchTime in order to ensure listings expire after 48 hours
          const timeNow = new Date();
          localStorage.setItem("lastSearchTime", JSON.stringify(timeNow.getTime()));
          setNoListingsFound(!sortedListings?.length);
          setQueryURL(null);
          setSearch(false);
        })
        .catch(err => console.error(err));
    }
  }, [queryURL, setListingIDs]);

  useEffect(() => {
    if (search) {
      const searchURL = getSearchURL(searchQuery, agentChoices);
      setQueryURL(searchURL);
      setSearch(false);
    }
  }, [search, searchQuery]);

  useEffect(() => {
    document.body.style.overflow = loadingListings 
      ? "hidden"
      : "auto"
  }, [loadingListings]);

  return (
    <>
      {loadingListings && <LoadingAnimation />}
      <div className="main-content-container">
        <SearchForm
          agentChoices={agentChoices}
          search={search}
          setAgentChoices={setAgentChoices}
          setListingIDs={setListingIDs}
          setLoadingListings={setLoadingListings}
          setLoadingTimer={setLoadingTimer}
          setNoListingsFound={setNoListingsFound}
          setSearch={setSearch}
          setSearchQuery={setSearchQuery}
        />

        <ListingsContainer
          listingIDs={listingIDs}
          noListingsFound={noListingsFound}
          loadingListings={loadingListings}
          loadingTimer={loadingTimer}
          setListingIDs={setListingIDs}
          setLoadingListings={setLoadingListings}
        />
      </div>
    </>
  );
}

export default App;
