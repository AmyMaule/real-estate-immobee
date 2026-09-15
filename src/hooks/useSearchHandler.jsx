import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getSearchQuery } from "../utilities";
import { listingsURL } from "../api";

// Builds the query URL when search changes
export const useSearchHandler = (search, searchQuery, agentChoices, setQueryURL, setSearch, locationChoices) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!search) return;
    
    const searchQueryParams = getSearchQuery(searchQuery, locationChoices);
    setQueryURL(`${listingsURL}${searchQueryParams}`);
    setSearch(false);
  }, [search, searchQuery, agentChoices, setQueryURL, setSearch]);
};
