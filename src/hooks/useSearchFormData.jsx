import { useState, useEffect } from 'react';
import { agentURL, postcodeURL } from "../api";

export const useSearchFormData = (setAgentChoices) => {
  const [locationChoices, setLocationChoices] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(postcodeURL).then(res => res.json()),
      fetch(agentURL).then(res => res.json())
    ])
      .then(([communeData, agentData]) => {
        const locations = communeData
          .map(commune => `${commune.commune} (${commune.postcode})`)
          .sort();

        setLocationChoices(locations);
        setAgentChoices(agentData);
      })
      .catch(err => console.error(err))
  }, [setAgentChoices]);

  return locationChoices;
}
