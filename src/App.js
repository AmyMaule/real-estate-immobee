import React, { useState, useEffect, useContext } from "react";

import { baseURL } from './data';

import { getSearchURL } from "./utilities";

import { ListingsContext } from ".";

import ListingsContainer from "./components/ListingsContainer";
import LoadingAnimation from "./components/LoadingAnimation";
import SearchForm from "./components/SearchForm";

const App = () => {
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
          // sort listings by increasing price initially
          const sortedListings = data?.length ? data.sort((a, b) => a.price > b.price ? 1 : -1) : [];
          setListingIDs(sortedListings);
          // save array of shortened listings to local storage
          localStorage.setItem("listingIDs", JSON.stringify(sortedListings));
          setNoListingsFound(!data?.length);
          setQueryURL(null);
          setSearch(false);
        })
        .catch(err => console.error(err));
    }
  }, [queryURL, setListingIDs]);

  useEffect(() => {
    if (search) {
      const searchURL = getSearchURL(searchQuery);
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
