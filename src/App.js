import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { baseURL } from './data';

import { getSearchURL } from "./utilities";

import ListingsContainer from "./components/ListingsContainer";
import LoadingAnimation from "./components/LoadingAnimation";
import SearchForm from "./components/SearchForm";

// add modal to show more listing information
// add footer with contact link
// add error page and ErrorElement to react router config
// make the search form "advanced" button grow the backround gradually as well as the search box
// when listings dropdown changes, reset page to 1

const App = () => {
  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [noListingsFound, setNoListingsFound] = useState(false);
  const [queryURL, setQueryURL] = useState();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { page } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // if user refreshes the page, return to the base URL
    if (page && !listings.length && !noListingsFound) {
      let url = location.pathname.slice(0, location.pathname.indexOf("/" + page));
      navigate(url);
    }
  }, [page, listings]);

  useEffect(() => {
    if (typeof queryURL === "string") {
      fetch(baseURL + queryURL)
        .then(res => res.json())
        .then(data => {
          // sort listings by increasing price initially
          setListings(data?.length ? data.sort((a, b) => a.price > b.price ? 1 : -1) : []);
          setNoListingsFound(!data.length);
          setQueryURL(null);
          setShowSearchResults(true);
          setSearch(false);
        })
        .catch(err => console.error(err));
    }
  }, [queryURL]);

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
