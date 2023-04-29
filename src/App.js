import React, { useState, useEffect } from "react";

import { baseURL } from './data';

import { getSearchURL } from "./utilities";

import ListingsContainer from "./components/ListingsContainer";
import LoadingAnimation from "./components/LoadingAnimation";
import SearchForm from "./components/SearchForm";

// Scroll down the page as listings load, or as "no listings" loads
// bug where no listings are found, then can't search again
// figure out why the smooth scroll isn't working

function App() {
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const [queryURL, setQueryURL] = useState();
  const [listings, setListings] = useState([]);
  const [noListingsFound, setNoListingsFound] = useState(false);

  useEffect(() => {
    if (typeof queryURL === "string") {
      // console.log(baseURL + queryURL)
      fetch(baseURL + queryURL)
        .then(res => res.json())
        .then(data => {
          // sort listings by increasing price initially
          setListings(data?.length ? data.sort((a, b) => a.price > b.price ? 1 : -1) : []);
          setNoListingsFound(!data.length);
          setQueryURL(null);
          setShowSearchResults(true);
          setSearch(false);
        });
    }
  }, [queryURL]);

  useEffect(() => {
    if (search) {
      const searchURL = getSearchURL(searchQuery);
      setQueryURL(searchURL);
      setSearch(false);
    }
  }, [search]);

  useEffect(() => {
    document.body.style.overflow = loadingListings 
      ? "hidden"
      : "auto"
  }, [loadingListings]);

  return (
      <>
      {loadingListings && 
        <LoadingAnimation />
      }

      <div className="page-container">
        <SearchForm
          search={search}
          setListings={setListings}
          setLoadingListings={setLoadingListings}
          setLoadingTimer={setLoadingTimer}
          setNoListingsFound={setNoListingsFound}
          setSearch={setSearch}
          setSearchQuery={setSearchQuery}
        />

        {showSearchResults &&
          <ListingsContainer
            listings={listings}
            noListingsFound={noListingsFound}
            loadingListings={loadingListings}
            loadingTimer={loadingTimer}
            setListings={setListings}
            setLoadingListings={setLoadingListings}
          />
        }
      </div>
    </>
  );
}

export default App;
