// data related to properties/agents that may need periodic updates
export const propertyTypeMapping = {
  "House": "Maison",
  "Apartment": "Appartement",
  "Building": "Immeuble",
  "Terrain": "Terrain",
  "Commercial": "Commerce"
}

export const baseURL = VITE_BASE_URL;

export const agentURL = `${baseURL}/static/data/agent_mapping.json`;

export const postcodeURL = `${baseURL}/static/data/postcode_mapping.json`;
