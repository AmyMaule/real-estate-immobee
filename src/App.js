import React, { useState, useEffect } from "react";

import { baseURL } from './data';

import { getSearchURL } from "./utilities";

import ListingsContainer from "./components/ListingsContainer";
import SearchForm from "./components/SearchForm";

// TODO: Sort listings by price/size/location, etc

function App() {
  const [loadingListings, setLoadingListings] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const [queryURL, setQueryURL] = useState();
  const [listings, setListings] = useState([]);
  const [noListingsFound, setNoListingsFound] = useState(false);

  useEffect(() => {
    if (typeof queryURL === "string") {
      console.log(baseURL + queryURL)
      fetch(baseURL + queryURL)
        .then(res => res.json())
        .then(data => {
          setNoListingsFound(!data.length);
          setListings(data);
          setShowSearchResults(true);
          setSearch(false);
          setLoadingListings(true);
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

  return (
      <>
      <div className="page-container">
        <h1 className="page-title">Property for sale</h1>
        <SearchForm
          search={search}
          setNoListingsFound={setNoListingsFound}
          setSearch={setSearch}
          setSearchQuery={setSearchQuery}
        />

        {showSearchResults &&
          <ListingsContainer
            listings={listings}
            noListingsFound={noListingsFound}
            loadingListings={loadingListings}
            setListings={setListings}
            setLoadingListings={setLoadingListings}
          />
        }
      </div>
    </>
  );
}

export default App;
