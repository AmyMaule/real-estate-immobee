import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getSearchQuery } from "../utilities";

// Update the browser URL when search changes
export const useSearchHandler = (search, searchQuery, setSearch, locationChoices) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!search) return;
    const searchQueryParams = getSearchQuery(searchQuery, locationChoices, 1);
    navigate(`/search${searchQueryParams}`);
    setSearch(false);
  }, [
    search, searchQuery, locationChoices, navigate, setSearch
  ]);
};
