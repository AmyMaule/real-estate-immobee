import { agentChoicesMapping } from "../data";

export const getSearchURL = searchQuery => {
  const queryParams = Object.keys(searchQuery);
  let query = "";

  if (queryParams.indexOf("agents") !== -1) {
    const agentQuery = searchQuery.agents.map(agent => {
      return agentChoicesMapping[agent];
    }).join(",");
    query += `&agent_list=${agentQuery}`;
  }
  
  if (queryParams.indexOf("area") !== -1) {
    const areaQuery = searchQuery.area.map(area => {
      return area.split(",")[0].replaceAll(" ", "%20")
    }).join(",");
    query += `&town=${areaQuery}`;
  }

  if (queryParams.indexOf("propertyType") !== -1) {
    const propertyTypeQuery = searchQuery.propertyType.join(",");
    query += `&type_list=${propertyTypeQuery}`;
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
  if (searchQuery.inc_none_rooms === false) {
    query += "&inc_none_rooms=false";
  }
  if (searchQuery.inc_none_size === false) {
    query += "&inc_none_size=false";
  }
  if (searchQuery.inc_none_plot === false) {
    query += "&inc_none_plot=false";
  }
  
  // &search_radius=0
  
  if (query) query = "?" + query.slice(1);
  
  console.log(query);

  return query;
}
