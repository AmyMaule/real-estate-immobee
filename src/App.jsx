import React, { useState, useEffect, useContext } from "react";

import { useFetchListings } from "./hooks/useFetchListings";
import { useSearchHandler } from "./hooks/useSearchHandler";
import { useSearchFormData } from "./hooks/useSearchFormData";
import { ListingsContext } from ".";

import ListingsContainer from "./components/listings/ListingsContainer";
import LoadingAnimation from "./components/pages/LoadingAnimation";
import SearchForm from "./components/searchForm/SearchForm";

//// TODO: on page refresh, refetch current query

const App = () => {
  const [agentChoices, setAgentChoices] = useState({});
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [locationChoices, setLocationChoices] = useState([]);
  const [noListingsFound, setNoListingsFound] = useState(false);
  const [queryURL, setQueryURL] = useState();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const { listingsData, setlistingsData } = useContext(ListingsContext);
  
  useFetchListings(queryURL, setlistingsData, setNoListingsFound, setQueryURL, setSearch);
  useSearchHandler(search, searchQuery, agentChoices, setQueryURL, setSearch, locationChoices);
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
