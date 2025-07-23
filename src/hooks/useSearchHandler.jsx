import { useEffect } from "react";
import { getSearchURL } from "../utilities";

// Builds the query URL when search changes
export const useSearchHandler = (search, searchQuery, agentChoices, setQueryURL, setSearch) => {
  useEffect(() => {
    if (!search) return;
    const searchURL = getSearchURL(searchQuery, agentChoices);
    setQueryURL(searchURL);
    setSearch(false);
  }, [search, searchQuery, agentChoices, setQueryURL, setSearch]);
};
