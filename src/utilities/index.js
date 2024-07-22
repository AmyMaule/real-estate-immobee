import { propertyTypeMapping } from "../data";

export const getSearchURL = (searchQuery, agentChoices) => {
  const queryParams = Object.keys(searchQuery);
  let query = "";

  if (queryParams.includes("agents")) {
    const agentQuery = searchQuery.agents.map(agent => {
      return Object.keys(agentChoices).filter(key => agentChoices[key] === agent);
    }).join(",");
    query += `&agents=${agentQuery}`;
  }
  
  // only search by department if area has no value
  if (queryParams.includes("department") && !queryParams.includes("area")) {
    // only send the department number in the query string (i.e. "11" not "Aude (11)"")
    const departments = searchQuery.department.map(dept => {
      return dept.split("(")[1].split(")")[0];
    }).join(",");
    query += `&depts=${departments}`;
  }

  if (queryParams.includes("area")) {
    const areaQuery = searchQuery.area.map(area => {
      const town = area.split(", ")[0].replaceAll(" ", "%20");
      const postcode = area.split(", ")[1];
      return `${postcode}-${town}`;
    }).join(",");
    query += `&town=${areaQuery}&search_radius=${searchQuery.search_radius || "1"}`;
  }

  if (queryParams.includes("property_type")) {
    const propertyTypeQuery = searchQuery.property_type.map(type => propertyTypeMapping[type]).join(",");
    query += `&types=${propertyTypeQuery}`;
  }

  const numberInputs = ["minBeds", "maxBeds", "minPrice", "maxPrice", "minPlot", "maxPlot", "minSize", "maxSize"];
  numberInputs.forEach(input => {
    if (queryParams.includes(input)) {
      const snakeCaseInput = input.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      query += `&${snakeCaseInput}=${searchQuery[input]}`;
    }
  });
  
  // exclude listings with incomplete data if the user has unchecked the box
  if (searchQuery.inc_none_beds === false) {
    query += "&inc_none_beds=false";
  }
  if (searchQuery.inc_none_location === false) {
    query += "&inc_none_location=false";
  }
  if (searchQuery.inc_none_size === false) {
    query += "&inc_none_size=false";
  }
  if (searchQuery.inc_none_plot === false) {
    query += "&inc_none_plot=false";
  }

  if (queryParams.includes("keywords")) {
    // split on space or comma
    const keywordList = searchQuery.keywords.split(/[ ,]+/).join(",");
    query += `&keywords=${keywordList}`
  }
  
  if (query) query = "?" + query.slice(1);
  
  console.log(query);

  return "/search_results" + query;
}

export const scrollTo = (top = 0, behavior = "smooth") => window.scrollTo({ top: top, behavior: behavior });

export const handlePageChange = (setListingIDs, scrollBehavior) => {
  setListingIDs([]);
  localStorage.setItem("listingIDs", JSON.stringify([]));
  if (scrollBehavior) scrollTo(0, scrollBehavior);
}
