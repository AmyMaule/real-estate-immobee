import React, { useState, useEffect } from "react";

import { baseURL } from './data';

import { getSearchURL } from "./utilities";

import ListingsContainer from "./components/ListingsContainer";
import SearchForm from "./components/SearchForm";

// TODO: Sort listings by price/size/location, etc

function App() {
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
          setSearch(false);
        });
    }
  }, [queryURL]);

  useEffect(() => {
    if (search) {
      const searchURL = getSearchURL(searchQuery);
      setQueryURL(searchURL);
    }
  }, [search]);

  return (
    <div className="page-container">
      <h1 className="page-title">Property for sale</h1>
      <SearchForm
        setSearch={setSearch}
        setSearchQuery={setSearchQuery}
        setShowSearchResults={setShowSearchResults}
      />

      {showSearchResults &&
        <ListingsContainer
          listings={listings}
          noListingsFound={noListingsFound}
        />
      }
    </div>
  );
}

export default App;
