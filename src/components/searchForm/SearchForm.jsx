import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import Multiselect from "react-widgets/Multiselect";
import { useNavigate } from 'react-router-dom';
import { useSearchFormData } from '../../hooks/useSearchFormData';

import Dropdown from './Dropdown';
import Input from './Input';
import SearchSlider from './SearchSlider';
import SearchTextarea from './SearchTextarea';
import SearchUnknown from './SearchUnknown';
import { capitalize } from '../../utilities';
import { propertyTypes } from '../../data';

const SearchForm = ({ 
  agentChoices, 
  locationChoices,
  search, 
  setlistingsData,
  setLoadingListings, 
  setLoadingTimer, 
  setNoListingsFound, 
  setSearch, 
  setSearchQuery,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [showAdvanced, setShowAdvanced] = useState(false);
  //// TODO: get dept options from the locations endpoint
  const departmentOptions = ["Aude (11)", "Ariège (09)", "Haute-Garonne (31)", "Hérault (34)", "Pyrenées-Orientales (66)"];
  const searchFormRef = useRef();
  const navigate = useNavigate();

  const onSubmit = submitData => {
    localStorage.removeItem("sortingBy"); // sortingDropdown seems to be accessing this before it is removed
    navigate("/search/1");
    if (search) return;
    setLoadingListings(true);
    setLoadingTimer(Date.now())
    setlistingsData(null);
    setNoListingsFound(false);
    setSearch(true);
    setShowAdvanced(false);
    const searchQuery = {};

    // only populate searchQuery with values the user has provided, ensure number values are converted to numbers
    const numberValues = ["min_bedrooms", "max_bedrooms", "min_land_area_m2", "max_land_area_m2", "min_price", "max_price", "min_building_area_m2", "max_building_area_m2"];
    for (let [key, value] of Object.entries(submitData)) {
      if (typeof value === "string" && value.trim()) {
        if (numberValues.indexOf(key) !== -1) {
          value = Number(value.replaceAll(",", ""));
        }
        searchQuery[key] = value;
      } else if (Array.isArray(value) && value.length) {
        searchQuery[key] = value;
      }
    }

    // includeUnknown are the checkboxes to determine whether the search results include listings with incomplete data
    const includeUnknown = ["include_unknown_bedrooms", "include_unknown_building_area", "include_unknown_land_area", "include_unknown_locations"];
    includeUnknown.forEach(value => {
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
    } else {
      // When the user hits "Advanced", if it is scrolled too far down, the form will jump to the bottom when expanded
      const currentScrollPos = window.scrollY;
      setTimeout(() => {
        window.scrollTo(0, currentScrollPos);
      }, 0);
    }
    setShowAdvanced(prev => !prev);
  }

  const getAgentLabels = () => agentChoices.map(agent => agent.name);

  if (!locationChoices.length) {
    return (
      <div className="loading-bee-container">
        <div className="hero-section-search">
          <img
            alt=""
            className="hero-section-search-img"
            src={window.innerWidth > 535 ? "/search-bg.jpg" : "/search-bg-mobile.jpg"}
          />
          <div className="hero-section-search-overlay" />
          <div className="loading-bee-route-container">
            <div className="loading-bee-border" />
            <div className="loading-bee" />
            <h1 className="loading-bee-title">Loading...</h1>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="hero-section-search">
      <img
        alt=""
        className="hero-section-search-img"
        src={window.innerWidth > 535 ? "/search-bg.jpg" : "/search-bg-mobile.jpg"}
      />
      <div className="hero-section-search-overlay" />
      <h1 className="hero-section-search-title">Let <span className="text-logo">ImmoBee</span> help you{"\n"}find your dream home</h1>
      <form className="search-form-container" onSubmit={handleSubmit(onSubmit)} ref={searchFormRef}>
        <div className="search-label">
          Price range (€)
          <div className="search-input-container">
            <Input name="min_price" number placeholder="Min" register={register} setValue={setValue} maxLength={9} />
            <Input name="max_price" number placeholder="Max" register={register} setValue={setValue} maxLength={9} />
          </div>
        </div>
        <Dropdown
          options={propertyTypes.map(propertyType => capitalize(propertyType))}
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
              <Input name="min_building_area_m2" number placeholder="Min" register={register} setValue={setValue} maxLength={6} />
              <Input name="max_building_area_m2" number placeholder="Max" register={register} setValue={setValue} maxLength={6} />
            </div>
          </div>
          <div className="search-label">
            Plot size (m{String.fromCharCode(178)})
            <div className="search-input-container">
              <Input name="min_land_area_m2" number placeholder="Min" register={register} setValue={setValue} maxLength={6} />
              <Input name="max_land_area_m2" number placeholder="Max" register={register} setValue={setValue} maxLength={6} />
            </div>
          </div>
          <div className="search-label">
            No. bedrooms
            <div className="search-input-container">
              <Input name="min_bedrooms" number placeholder="Min" register={register} setValue={setValue} maxLength={3} />
              <Input name="max_bedrooms" number placeholder="Max" register={register} setValue={setValue} maxLength={3} />
            </div>
          </div>
          <div className="search-label search-label-multiselect">
            Agents
            <Multiselect
              data={getAgentLabels()}
              filter='contains'
              onChange={selected => {
                const selectedAgentSlugs = [];
                selected.forEach(agent => {
                  selectedAgentSlugs.push(agentChoices.find(choice => choice.name === agent).slug);
                });
                setValue("agents", selectedAgentSlugs);
              }}
              textField={item =>
                watch("agents")?.includes(item)
                // show full name if item is not selected, don't show "Immobilier" for selected agents to save space
                  ? item.replace(" Immobilier", "") : item
              }
            />
          </div>
          <div className="search-label search-label-long">
            Keywords (in French)
            <SearchTextarea
              field="keywords"
              placeholder="Enter search keywords"
              register={register}
            />
          </div>
          <div className="search-label search-label-long search-label-multiselect">
            Town
            <Multiselect
              data={locationChoices.map(commune => `${commune.commune} (${commune.postcode})`)}
              filter='contains'
              onChange={selected => setValue("area", selected)}
              showSelectedItemsInList
              value={watch("area") || []}
            />
          </div>
          <SearchSlider register={register} />
          {showAdvanced && <SearchUnknown register={register} setValue={setValue} watch={watch} />}
        </div>
      </form>
    </div>
  )
}

export default SearchForm;
