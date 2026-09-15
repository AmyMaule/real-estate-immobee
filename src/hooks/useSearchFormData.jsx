import { useEffect } from 'react';
import { agentURL, postcodeURL } from "../api";

export const useSearchFormData = (setAgentChoices, setLocationChoices) => {
  useEffect(() => {
    Promise.all([
      fetch(postcodeURL).then(res => res.json()),
      fetch(agentURL).then(res => res.json())
    ])
      .then(([communeData, agentData]) => {
        const alphabeticalCommuneData = communeData.sort((a, b) => a.commune > b.commune);
        setLocationChoices(alphabeticalCommuneData);
        setAgentChoices(agentData);
      })
      .catch(err => console.error(err))
  }, [setAgentChoices]);

  /// TODO: return?
  return null;
}
