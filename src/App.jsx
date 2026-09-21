import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { listingsURL } from "./api";
import { useFetchListings } from "./hooks/useFetchListings";
import { useSearchHandler } from "./hooks/useSearchHandler";
import { useSearchFormData } from "./hooks/useSearchFormData";
import { ListingsContext } from ".";

import ListingsContainer from "./components/listings/ListingsContainer";
import LoadingAnimation from "./components/pages/LoadingAnimation";
import SearchForm from "./components/searchForm/SearchForm";

//// TODO: persist search form with current search values after submission
//// TODO: update the sort by dropdown
//// TODO: sort out the pagination for saved listings
//// TODO: Load first image of each listing first, and the rest after
//// TODO: Update the search query to provide hidden listings
//// TODO: Make hidden listings page
//// TODO: figure out saved and hidden listings pagination

const App = () => {
  const [agentChoices, setAgentChoices] = useState({});
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [locationChoices, setLocationChoices] = useState([]);
  const [noListingsFound, setNoListingsFound] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const { listingsData, setlistingsData } = useContext(ListingsContext);
  
  const [searchParams] = useSearchParams();

  // Refetch the current search on page refresh or URL navigation,
  // but ensure that navigating to /search does not perform a new search query
  const queryString = searchParams.toString();
  const queryURL = queryString ? `${listingsURL}?${queryString}` : null;

  useFetchListings(queryURL, setlistingsData, setNoListingsFound);
  useSearchHandler(search, searchQuery, setSearch, locationChoices);
  useSearchFormData(setAgentChoices, setLocationChoices);

  useEffect(() => {
    document.body.style.overflow = loadingListings ? "hidden" : "auto";
  }, [loadingListings]);

  return (
    <>
      {loadingListings && <LoadingAnimation />}
      <div className="main-content-container">
        <SearchForm
          agentChoices={agentChoices}
          locationChoices={locationChoices}
          search={search}
          setlistingsData={setlistingsData}
          setLoadingListings={setLoadingListings}
          setLoadingTimer={setLoadingTimer}
          setNoListingsFound={setNoListingsFound}
          setSearch={setSearch}
          setSearchQuery={setSearchQuery}
        />

        <ListingsContainer
          listingsData={listingsData}
          noListingsFound={noListingsFound}
          loadingListings={loadingListings}
          loadingTimer={loadingTimer}
          setLoadingListings={setLoadingListings}
        />
      </div>
    </>
  );
}

export default App;
