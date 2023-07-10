import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { baseURL } from './data';

import { getSearchURL } from "./utilities";

import ListingsContainer from "./components/ListingsContainer";
import LoadingAnimation from "./components/LoadingAnimation";
import SearchForm from "./components/SearchForm";

const App = () => {
  const [listingIDs, setListingIDs] = useState([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [noListingsFound, setNoListingsFound] = useState(false);
  const [queryURL, setQueryURL] = useState();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { currentPage } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!noListingsFound && !listingIDs?.length) {
      console.log("The current page is", currentPage);
      setListingIDs(JSON.parse(localStorage.getItem("listingIDs")));
      setShowSearchResults(true);

      // check if this is running on saved listings page - might be redundant
      const isSavedListingsPage = location.pathname.startsWith("/saved-listings");
      console.log(location.pathname)
      setTimeout(() => {
        window.scrollTo({
          top: isSavedListingsPage ? 0 : document.querySelector(".search-results-container")?.offsetTop - 63 || 0,
          behavior: "smooth",
        });
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (typeof queryURL === "string") {
      fetch(baseURL + queryURL)
        .then(res => res.json())
        .then(data => {
          // sort listings by increasing price initially
          const sortedListings = data?.length ? data.sort((a, b) => a.price > b.price ? 1 : -1) : [];
          console.log(sortedListings.length)
          setListingIDs(sortedListings);
          // save array of shortened listings to local storage
          localStorage.setItem("listingIDs", JSON.stringify(sortedListings));
          console.log(data)
          setNoListingsFound(!data?.length);
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

        {showSearchResults &&
          <ListingsContainer
            listingIDs={listingIDs}
            noListingsFound={noListingsFound}
            loadingListings={loadingListings}
            loadingTimer={loadingTimer}
            setListingIDs={setListingIDs}
            setLoadingListings={setLoadingListings}
          />
        }
      </div>
    </>
  );
}

export default App;
