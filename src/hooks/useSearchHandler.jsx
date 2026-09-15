import { useEffect } from "react";
import { getSearchURL } from "../utilities";

// Builds the query URL when search changes
export const useSearchHandler = (search, searchQuery, agentChoices, setQueryURL, setSearch, locationChoices) => {
  useEffect(() => {
    if (!search) return;
    const searchURL = getSearchURL(searchQuery, locationChoices);
    setQueryURL(searchURL);
    setSearch(false);
  }, [search, searchQuery, agentChoices, setQueryURL, setSearch]);
};
