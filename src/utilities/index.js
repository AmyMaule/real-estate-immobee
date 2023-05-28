import { 
  agentMapping,
  propertyTypeMapping
} from "../data";

export const getSearchURL = searchQuery => {
  const queryParams = Object.keys(searchQuery);
  let query = "";

  if (queryParams.indexOf("agents") !== -1) {
    const agentQuery = searchQuery.agents.map(agent => {
      return agentMapping[agent];
    }).join(",");
    query += `&agents=${agentQuery}`;
  }
  
  // only search by department if area has no value
  if (queryParams.indexOf("department") !== -1 && queryParams.indexOf("area") === -1) {
    // only send the department number in the query string (i.e. "11" not "Aude (11)"")
    const departments = searchQuery.department.map(dept => {
      return dept.split("(")[1].split(")")[0];
    }).join(",");
    query += `&depts=${departments}`;
  }

  if (queryParams.indexOf("area") !== -1) {
    const areaQuery = searchQuery.area.map(area => {
      return area.split(",")[0].replaceAll(" ", "%20")
    }).join(",");
    query += `&town=${areaQuery}&search_radius=${searchQuery.search_radius || "1"}`;
  }

  if (queryParams.indexOf("property_type") !== -1) {
    const propertyTypeQuery = searchQuery.property_type.map(type => propertyTypeMapping[type]).join(",");
    query += `&types=${propertyTypeQuery}`;
  }

  const numberInputs = ["minBeds", "maxBeds", "minPrice", "maxPrice", "minPlot", "maxPlot", "minSize", "maxSize"];
  numberInputs.forEach(input => {
    if (queryParams.indexOf(input) !== -1) {
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

  if (queryParams.indexOf("keywords") !== -1) {
    // split on space or comma
    const keywordList = searchQuery.keywords.split(/[ ,]+/).join(",");
    query += `&keywords=${keywordList}`
  }
  
  if (query) query = "?" + query.slice(1);
  
  console.log(query);

  // save the search string to local storage
  localStorage.setItem("searchQuery", query);

  return query;
}

export const scrollTo = top => window.scrollTo({top: top, behavior: "smooth"});
