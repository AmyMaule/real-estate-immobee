import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { listingsURL } from "./api";
import { useFetchListings } from "./hooks/useFetchListings";
import { useSearchFormData } from "./hooks/useSearchFormData";
import { ListingsContext } from ".";

import ListingsContainer from "./components/listings/ListingsContainer";
import LoadingAnimation from "./components/pages/LoadingAnimation";
import SearchForm from "./components/searchForm/SearchForm";

//// TODO: Add price history to listing detail page
//// TODO: get departmentOptions from the locations endpoint

const App = () => {
  const [agentChoices, setAgentChoices] = useState({});
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [locationChoices, setLocationChoices] = useState([]);
  const [noListingsFound, setNoListingsFound] = useState(false);
  const { listingsData, setlistingsData } = useContext(ListingsContext);
  
  // Refetch the current search on page refresh or URL navigation,
  // but ensure that navigating to /search does not perform a new search query
  const location = useLocation();
  const queryString = new URLSearchParams(location.search).toString();
  const queryURL = queryString ? `${listingsURL}?${queryString}` : null;

  useFetchListings(queryURL, location.key, setlistingsData, setNoListingsFound);
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
          setlistingsData={setlistingsData}
          setLoadingListings={setLoadingListings}
          setLoadingTimer={setLoadingTimer}
          setNoListingsFound={setNoListingsFound}
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
