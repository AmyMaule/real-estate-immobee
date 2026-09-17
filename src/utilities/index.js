export const getSearchQuery = (searchQuery, locationChoices, page = 1) => {
  const params = new URLSearchParams();

  if (searchQuery.agents) {
    searchQuery.agents.forEach(agent => {
      params.append("agency", agent);
    });
  }

  // Only search by department if area has no value
  if (searchQuery.department && !searchQuery.area) {
    searchQuery.department.forEach(dept => {
      const departmentCode = dept.split("(")[1].split(")")[0];
      params.append("department", departmentCode);
    });
  }

  if (searchQuery.area) {
    searchQuery.area.forEach(area => {
      const location = locationChoices.find(
        location => `${location.commune} (${location.postcode})` === area
      );

      if (location) {
        params.append("town_code", location.code);
      }
    });

    params.set("radius_km", searchQuery.search_radius || "1");
  }

  if (searchQuery.property_type) {
    for (let propertyType of searchQuery.property_type) {
      params.append("property_type", propertyType.toLowerCase());
    }
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

    keywordList.forEach(keyword => {
      params.append("keyword", keyword);
    });
  }

  params.set("page", page);

  const finalSearchParams = params.toString();

  console.log(finalSearchParams);

  return finalSearchParams ? `?${finalSearchParams}&page_size=24` : "";
};

export const scrollTo = (top = 0, behavior = "smooth") => window.scrollTo({ top: top, behavior: behavior });

export const capitalize = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

export const listingUnavailable = listing => !["active", "under_offer"].includes(listing?.availability);
