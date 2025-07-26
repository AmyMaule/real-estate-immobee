import { useState, useEffect } from 'react';
import { agentURL, postcodeURL } from "../data";

export const useSearchFormData = (setAgentChoices) => {
  const [locationChoices, setLocationChoices] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(postcodeURL).then(res => res.json()),
      fetch(agentURL).then(res => res.json())
    ])
      .then(([postcodeData, agentData]) => {
        const postcodes = Object.keys(postcodeData);
        const locations = postcodes
          .map(postcode => postcodeData[postcode].map(
            town => `${town}, ${postcode}`
          ))
          .flat()
          .sort();

        setLocationChoices(locations);
        setAgentChoices(agentData);
      })
      .catch(err => console.error(err))
  }, [setAgentChoices]);

  return locationChoices;
}
