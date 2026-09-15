import { propertyTypeMapping } from "../data";
import { listingsURL } from "../api";

export const getSearchURL = (searchQuery, locationChoices) => {
  const queryParams = Object.keys(searchQuery);
  let query = "";

  if (queryParams.includes("agents")) {
    for (let agent of searchQuery.agents) {
      query += `&agency=${agent}`;
    }
  }
  
  // only search by department if area has no value
  if (queryParams.includes("department") && !queryParams.includes("area")) {
    // only send the department number in the query string (i.e. "11" not "Aude (11)"")
    const departments = searchQuery.department.map(dept => {
      return dept.split("(")[1].split(")")[0];
    });

    for (let department of departments) {
      query += `&department=${department}`;
    }
  }

  //// TODO - check default radius
  if (queryParams.includes("area")) {
    searchQuery.area.forEach(area => {
      const townCode = locationChoices.find(location => `${location.commune} (${location.postcode})` === area).code;
      query += `&town_code=${townCode}`;
    })
    query += `&radius_km=${searchQuery.search_radius || "1"}`;
  }

  if (queryParams.includes("property_type")) {
    const propertyTypeQuery = searchQuery.property_type.map(type => propertyTypeMapping[type]).join(",");
    query += `&types=${propertyTypeQuery}`;
  }

  const numberInputs = ["min_bedrooms", "max_bedrooms", "min_price", "max_price", "min_land_area_m2", "max_land_area_m2", "min_building_area_m2", "max_building_area_m2"];
  numberInputs.forEach(input => {
    if (queryParams.includes(input)) {
      query += `&${input}=${searchQuery[input]}`;
    }
  });
  
  // exclude listings with incomplete data if the user has unchecked the box
  if (searchQuery.include_unknown_bedrooms === false) {
    query += "&include_unknown_bedrooms=false";
  }
  if (searchQuery.include_unknown_locations === false) {
    query += "&include_unknown_locations=false";
  }
  if (searchQuery.include_unknown_building_area === false) {
    query += "&include_unknown_building_area=false";
  }
  if (searchQuery.include_unknown_land_area === false) {
    query += "&include_unknown_land_area=false";
  }

  if (queryParams.includes("keywords")) {
    // split on space or comma
    const keywordList = searchQuery.keywords.split(/[ ,]+/);
    for (let keyword of keywordList) {
      query += `&keyword=${keyword}`;
    }
  }
  
  //// TODO: Add sort method to query:  
  // Available values : newest, price_asc, price_desc

  if (query) query = "?" + query.slice(1);
  
  console.log(query);

  return `${listingsURL}${query}`;
}

export const scrollTo = (top = 0, behavior = "smooth") => window.scrollTo({ top: top, behavior: behavior });

export const handlePageChange = (setListingIDs, scrollBehavior) => {
  setListingIDs([]);
  localStorage.setItem("listingIDs", JSON.stringify([]));
  if (scrollBehavior) scrollTo(0, scrollBehavior);
}

export const capitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
