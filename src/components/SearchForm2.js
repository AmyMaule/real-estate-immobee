import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Multiselect from "react-widgets/Multiselect";

import { 
  agentChoicesMapping,
  propertyTypeList
} from '../data';

import Dropdown from './Dropdown';

// make hero-section height dynamic based on whether advanced search is selected
// add tooltip to explain to users they can select department OR area - also code this in to make sure one disables as the other gains a value
// the input with class search-textarea should be changed to a textarea with an auto height based on what the user enters

const SearchForm2 = ({ search, setListings, setLoadingListings, setLoadingTimer, setNoListingsFound, setSearch, setSearchQuery }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [locationChoices, setLocationChoices] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const departmentOptions = ["Aude (11)", "Ariège (09)", "Haute-Garonne (31)", "Hérault (34)", "Pyrenées-Orientales (66)"];

  const onSubmit = submitData => {
    if (search) return;
    setLoadingListings(true);
    setLoadingTimer(Date.now())
    setListings([]);
    setNoListingsFound(false);
    setSearch(true);
    const searchQuery = {};

    // only populate searchQuery with values the user has provided, ensure number values are converted to numbers
    const numberValues = ["minBeds", "maxBeds", "minPlot", "maxPlot", "minPrice", "maxPrice", "minSize", "maxSize"];
    for (let [key, value] of Object.entries(submitData)) {
      if (typeof value === "string" && value.trim()) {
        if (numberValues.indexOf(key) !== -1) {
          value = Number(value)
        }
        searchQuery[key] = value;
      } else if (Array.isArray(value) && value.length) {
        searchQuery[key] = value;
      }
    }

    // incNoneValues are the checkboxes to determine whether the search results include listings with incomplete data
    const incNoneValues = ["inc_none_beds", "inc_none_rooms", "inc_none_size", "inc_none_plot"];
    incNoneValues.forEach(value => {
      if (submitData[value] === false) {
        searchQuery[value] = submitData[value];
      }
    })
    setSearchQuery(searchQuery);
  }

  useEffect(() => {
    fetch("https://suspiciousleaf.pythonanywhere.com/postcode_dict/")
    .then(res => res.json())
    .then(data => {
      const postcodes = Object.keys(data);
      const locations = postcodes.map(postcode => (
        data[postcode].map(town => (
          `${town}, ${postcode}`
        ))
      )).flat().sort();
      setLocationChoices(locations);
    });   
  }, []);

  if (!locationChoices.length) return null;

  return (
    <div className="hero-section">
      <div className="hero-section-overlay" />
      <h1 className="hero-section-title">Find your dream home</h1>
      <form className="search-form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-label">
          Price range (€)
          <div className="search-input-container">
            <input className="search-input" placeholder="Min" maxLength={7} />
            <input className="search-input" placeholder="Max" maxLength={7} />
          </div>
        </div>
        <Dropdown options={propertyTypeList} title="Property type" showSelectedNames />
        <Dropdown options={departmentOptions} title="Area" />
        <div className="advanced-search-btn-container">
          <button className="btn-advanced-search" type="button" onClick={() => setShowAdvanced(prev => !prev)}>
          <span className="btn-advanced-search-icon">{showAdvanced ? "- " : "+ "}</span>
          Advanced search
          </button>
        </div>
        <button className="btn-search" type="submit">Search</button>

        <div className={`advanced-search-container ${showAdvanced ? "show-advanced" : "hide-advanced"}`}>
          <div className="search-label">
            Property size (m{String.fromCharCode(178)})
            <div className="search-input-container">
              <input className="search-input" placeholder="Min" maxLength={5} />
              <input className="search-input" placeholder="Max" maxLength={5} />
            </div>
          </div>
          <div className="search-label">
            Plot size (m{String.fromCharCode(178)})
            <div className="search-input-container">
              <input className="search-input" placeholder="Min" maxLength={5} />
              <input className="search-input" placeholder="Max" maxLength={5} />
            </div>
          </div>
          <div className="search-label">
            No. bedrooms
            <div className="search-input-container">
              <input className="search-input" placeholder="Min" maxLength={3} />
              <input className="search-input" placeholder="Max" maxLength={3} />
            </div>
          </div>
          <Dropdown options={Object.keys(agentChoicesMapping)} title="Agents" />
          <div className="search-label search-label-long">
            Keywords
            <div className="search-input-container">
              <input className="search-input search-textarea" placeholder="Search keywords" />
            </div>
          </div>
          <div className="search-label search-label-long">
            Area
            <Multiselect
              data={locationChoices}
              dataKey='id'
              filter='contains'
              textField='name'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchForm2;
