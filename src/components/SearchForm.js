import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import Multiselect from "react-widgets/Multiselect";
import { useNavigate } from 'react-router-dom';

import { 
  agentMapping,
  propertyTypeMapping
} from '../data';

import Dropdown from './Dropdown';
import Input from './Input';
import SearchSlider from './SearchSlider';
import SearchTextarea from './SearchTextarea';
import SearchUnknown from './SearchUnknown';

const SearchForm = ({ search, setListingIDs, setLoadingListings, setLoadingTimer, setNoListingsFound, setSearch, setSearchQuery }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [locationChoices, setLocationChoices] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const departmentOptions = ["Aude (11)", "Ariège (09)", "Haute-Garonne (31)", "Hérault (34)", "Pyrenées-Orientales (66)"];
  const searchFormRef = useRef();
  const navigate = useNavigate();

  const onSubmit = submitData => {
    localStorage.removeItem("sortingBy"); // sortingDropdown seems to be accessing this before it is removed
    localStorage.removeItem("listingIDs");
    navigate("/search/1");
    if (search) return;
    setLoadingListings(true);
    setLoadingTimer(Date.now())
    setListingIDs([]);
    setNoListingsFound(false);
    setSearch(true);
    const searchQuery = {};

    // only populate searchQuery with values the user has provided, ensure number values are converted to numbers
    const numberValues = ["minBeds", "maxBeds", "minPlot", "maxPlot", "minPrice", "maxPrice", "minSize", "maxSize"];
    for (let [key, value] of Object.entries(submitData)) {
      if (typeof value === "string" && value.trim()) {
        if (numberValues.indexOf(key) !== -1) {
          value = Number(value.replace(",", ""));
        }
        searchQuery[key] = value;
      } else if (Array.isArray(value) && value.length) {
        searchQuery[key] = value;
      }
    }

    // incNoneValues are the checkboxes to determine whether the search results include listings with incomplete data
    const incNoneValues = ["inc_none_beds", "inc_none_size", "inc_none_plot", "inc_none_location"];
    incNoneValues.forEach(value => {
      if (submitData[value] === false) {
        searchQuery[value] = submitData[value];
      }
    })
    setSearchQuery(searchQuery);
  }

  const toggleAdvancedSearch = () => {
    if (showAdvanced) {
      // If user hits "minimise", reset the towns so they can select a department instead
      setValue("area", "");
    }
    setShowAdvanced(prev => !prev);
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
    })
    .catch(err => console.error(err));
  }, []);

  if (!locationChoices.length) return null;
  
  return (
    <div className="hero-section-search">
      <img src="/47720.jpg" className="hero-section-search-img" alt="" />
      <div className="hero-section-search-overlay" />
      <h1 className="hero-section-search-title">Let <span className="text-logo">ImmoBee</span> help you{"\n"}find your dream home</h1>
      <form className="search-form-container" onSubmit={handleSubmit(onSubmit)} ref={searchFormRef}>
        <div className="search-label">
          Price range (€)
          <div className="search-input-container">
            <Input name="minPrice" number placeholder="Min" register={register} setValue={setValue} maxLength={9} />
            <Input name="maxPrice" number placeholder="Max" register={register} setValue={setValue} maxLength={9} />
          </div>
        </div>
        <Dropdown
          options={Object.keys(propertyTypeMapping)}
          setValue={setValue}
          showSelectedNames
          title="Property type"
        />
        <Dropdown
          options={departmentOptions}
          locked={watch("area")?.length}
          setValue={setValue}
          title="Department"
        />

          <button className="btn-advanced-search" type="button" onClick={toggleAdvancedSearch}>
            <i className="fa-solid fa-sliders btn-advanced-search-icon" />
            {showAdvanced ? "Minimise" : "Advanced"}
          </button>
        <button className="btn-search" type="submit">Search</button>

        <div className={`advanced-search-container ${showAdvanced ? "show-advanced" : "hide-advanced"}`}>
          <div className="search-label">
            Property size (m{String.fromCharCode(178)})
            <div className="search-input-container">
              <Input name="minSize" number placeholder="Min" register={register} setValue={setValue} maxLength={6} />
              <Input name="maxSize" number placeholder="Max" register={register} setValue={setValue} maxLength={6} />
            </div>
          </div>
          <div className="search-label">
            Plot size (m{String.fromCharCode(178)})
            <div className="search-input-container">
              <Input name="minPlot" number placeholder="Min" register={register} setValue={setValue} maxLength={6} />
              <Input name="maxPlot" number placeholder="Max" register={register} setValue={setValue} maxLength={6} />
            </div>
          </div>
          <div className="search-label">
            No. bedrooms
            <div className="search-input-container">
              <Input name="minBeds" number placeholder="Min" register={register} setValue={setValue} maxLength={3} />
              <Input name="maxBeds" number placeholder="Max" register={register} setValue={setValue} maxLength={3} />
            </div>
          </div>
          <div className="search-label search-label-multiselect">
            Agents
            <Multiselect
              data={Object.keys(agentMapping)}
              filter='contains'
              onChange={selected => setValue("agents", selected)}
              textField={item =>
                watch("agents")?.includes(item)
                // show full name if item is not selected selected, don't show "Immobilier" if selected
                  ? item.replace(" Immobilier", "") : item
              }
            />
          </div>
          <div className="search-label search-label-long">
            Keywords
            <SearchTextarea register={register} />
          </div>
          <div className="search-label search-label-long search-label-multiselect">
            Town
            <Multiselect
              data={locationChoices}
              filter='contains'
              onChange={selected => setValue("area", selected)}
              showSelectedItemsInList
              value={watch("area") || []}
            />
          </div>
          <SearchSlider register={register} />
          <SearchUnknown register={register} setValue={setValue} watch={watch} />
        </div>
      </form>
    </div>
  )
}

export default SearchForm;
