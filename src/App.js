import React, { useState, useEffect, useContext } from "react";

import { baseURL } from './data';

import { getSearchURL } from "./utilities";

import { ListingsContext } from ".";

import ListingsContainer from "./components/ListingsContainer";
import LoadingAnimation from "./components/LoadingAnimation";
import SearchForm from "./components/SearchForm";

const App = () => {
  const [agentChoices, setAgentChoices] = useState({});
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [noListingsFound, setNoListingsFound] = useState(false);
  const [queryURL, setQueryURL] = useState();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const { listingIDs, setListingIDs } = useContext(ListingsContext);

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
          setNoListingsFound(!sortedListings?.length);
          setQueryURL(null);
          setSearch(false);
        })
        .catch(err => console.error(err));
    }
  }, [queryURL, setListingIDs]);

  useEffect(() => {
    if (search && !Object.keys(agentChoices).length) {
      fetch(`${baseURL}/agent_dict/`)
        .then(res => res.json())
        .then(data => {
          setAgentChoices(data);
          const searchURL = getSearchURL(searchQuery, data);
          setQueryURL(searchURL);
          setSearch(false);
        })
        .catch(err => console.log(err))
    } else if (search) {
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
          search={search}
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
