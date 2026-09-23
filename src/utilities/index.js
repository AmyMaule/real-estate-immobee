export const getSearchQuery = (searchQuery, locationChoices, page = 1) => {
  const params = new URLSearchParams();

  if (searchQuery.agents) {
    params.set("agency", searchQuery.agents.join(","));
  }

  // Only search by department if area has no value
  if (searchQuery.department && !searchQuery.area) {
    const departmentCodes = searchQuery.department.map(dept => dept.split("(")[1].split(")")[0]);
    params.set("department", departmentCodes.join(","));
  }

  if (searchQuery.area) {
    const townCodes = searchQuery.area.map(area => {
      return locationChoices.find(
        location => `${location.commune} (${location.postcode})` === area
      )?.code;
    });
    const validTownCodes = townCodes.filter(Boolean);
    params.set("town_code", validTownCodes.join(","));

    if (townCodes.length) {
      params.set("town_code", townCodes.join(","));
    }
    params.set("radius_km", searchQuery.search_radius || "1");
  }

  if (searchQuery.property_type) {
    const propertyTypes = searchQuery.property_type.map(propertyType => {
      return propertyType.toLowerCase();
    });
    params.set("property_type", propertyTypes.join(","));
  }

  const numberInputs = [
    "min_bedrooms",
    "max_bedrooms",
    "min_price",
    "max_price",
    "min_land_area_m2",
    "max_land_area_m2",
    "min_building_area_m2",
    "max_building_area_m2"
  ];

  numberInputs.forEach(input => {
    if (searchQuery[input] !== undefined && searchQuery[input] !== "") {
      params.set(input, searchQuery[input]);
    }
  });

  const booleanParams = [
    "include_unknown_bedrooms",
    "include_unknown_locations",
    "include_unknown_building_area",
    "include_unknown_land_area"
  ];

  booleanParams.forEach(param => {
    if (searchQuery[param] === false) {
      params.set(param, "false");
    }
  });

  if (searchQuery.keywords) {
    const keywordList = searchQuery.keywords.split(/[ ,]+/);
    params.set("keyword", keywordList.join(","));
  }

  // If a user has hidden listings, ensure these are not returned in the paginated search results
  const hiddenListingIds = JSON.parse(localStorage.getItem("hiddenListingIds")) || [];
  if (hiddenListingIds.length) {
    params.set("exclude_listing_id", hiddenListingIds.join(","));
  }
  
  params.set("page", page);

  const finalSearchParams = params.toString();

  console.log(finalSearchParams);

  return finalSearchParams ? `?${finalSearchParams}&page_size=24` : "";
};

export const scrollTo = (top = 0, behavior = "smooth") => window.scrollTo({ top: top, behavior: behavior });

export const capitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const listingUnavailable = listing => !["active", "under_offer"].includes(listing?.availability);
