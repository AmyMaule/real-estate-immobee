import React, { useState, useEffect, useContext } from "react";

import { useExpireListingIDs } from "./hooks/useExpireListingIDs";
import { useFetchListings } from "./hooks/useFetchListings";
import { useSearchHandler } from "./hooks/useSearchHandler";
import { ListingsContext } from ".";

import ListingsContainer from "./components/listings/ListingsContainer";
import LoadingAnimation from "./components/pages/LoadingAnimation";
import SearchForm from "./components/searchForm/SearchForm";

const App = () => {
  const [agentChoices, setAgentChoices] = useState({});
  const [loadingListings, setLoadingListings] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState();
  const [noListingsFound, setNoListingsFound] = useState(false);
  const [queryURL, setQueryURL] = useState();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState([]);
  const { listingIDs, setListingIDs } = useContext(ListingsContext);
  
  useExpireListingIDs();
  useFetchListings(queryURL, setListingIDs, setNoListingsFound, setQueryURL, setSearch);
  useSearchHandler(search, searchQuery, agentChoices, setQueryURL, setSearch);

  useEffect(() => {
    if (!noListingsFound && !listingIDs?.length) {
      setListingIDs(JSON.parse(localStorage.getItem("listingIDs")));
    }
  }, [listingIDs?.length, noListingsFound, setListingIDs]);

  useEffect(() => {
    document.body.style.overflow = loadingListings ? "hidden" : "auto";
  }, [loadingListings]);

  return (
    <>
      {loadingListings && <LoadingAnimation />}
      <div className="main-content-container">
        <SearchForm
          agentChoices={agentChoices}
          search={search}
          setAgentChoices={setAgentChoices}
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
