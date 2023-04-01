import React, { useState, useEffect } from 'react';

import { 
  agentChoicesMapping,
  baseURL
} from '../data';

const ListingsContainer = ({ searchQuery }) => {
  const [listings, setListings] = useState([]);
  const [queryURL, setQueryURL] = useState();

  const getSearchURL = () => {
    const queryParams = Object.keys(searchQuery);
    if (!queryParams.length) return "";
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
    })
    
    // &search_radius=0
    // &inc_none_beds=true
    // &inc_none_size=true
    // &inc_none_plot=true
    
    query = "?" + query.slice(1);
    console.log(query)
    setQueryURL(query);
  }

  useEffect(() => {
    if (typeof queryURL === "string") {
      console.log(baseURL + queryURL)
      fetch(baseURL + queryURL)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setListings(data)
        });
    }
  }, [queryURL]);

  useEffect(() => {
    getSearchURL();
  }, [searchQuery]);

  if (!listings.length) {
    return <div className="no-listings-found">No properties found matching your search criteria.</div>
  }

  return (   
     <div className="listings-container">{listings.length}</div>
  )
}

export default ListingsContainer;
