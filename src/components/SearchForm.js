import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Multiselect from "react-widgets/Multiselect";

import { 
  agentMapping,
  propertyTypeMapping
} from '../data';

import Dropdown from './Dropdown';
import Input from './Input';

// make hero-section height dynamic based on whether advanced search is selected
// add tooltip to explain to users they can select department OR area - also code this in to make sure one disables as the other gains a value
// the input with class search-textarea should be changed to a textarea with an auto height based on what the user enters

const SearchForm = ({ search, setListings, setLoadingListings, setLoadingTimer, setNoListingsFound, setSearch, setSearchQuery }) => {
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

  const renderSliderOption = (id, value, radius, defaultChecked) => {
    return (
      <>
        <input
          className="input-slider"
          defaultChecked={defaultChecked}
          id={id}
          name="search-radius"
          type="radio"
          value={value}
          {...register("search_radius")}
        />
        <label className="label-slider" htmlFor={id} search-radius={`${radius} km`} />
      </>
    )
  }

  if (!locationChoices.length) return null;

  return (
    <div className="hero-section">
      <div className="hero-section-overlay" />
      <h1 className="hero-section-title">Find your dream home</h1>
      <form className="search-form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-label">
          Price range (€)
          <div className="search-input-container">
            <Input name="minPrice" number placeholder="Min" register={register} maxLength={7} />
            <Input name="maxPrice" number placeholder="Max" register={register} maxLength={7} />
          </div>
        </div>
        <Dropdown
          options={Object.keys(propertyTypeMapping)}
          register={register}
          setValue={setValue}
          showSelectedNames
          title="Property type"
        />
        <Dropdown
          options={departmentOptions}
          register={register}
          setValue={setValue}
          title="Department"
        />
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
              <Input name="minSize" number placeholder="Min" register={register} maxLength={5} />
              <Input name="maxSize" number placeholder="Max" register={register} maxLength={5} />
            </div>
          </div>
          <div className="search-label">
            Plot size (m{String.fromCharCode(178)})
            <div className="search-input-container">
              <Input name="minPlot" number placeholder="Min" register={register} maxLength={5} />
              <Input name="maxPlot" number placeholder="Max" register={register} maxLength={5} />
            </div>
          </div>
          <div className="search-label">
            No. bedrooms
            <div className="search-input-container">
              <Input name="minBeds" number placeholder="Min" register={register} maxLength={3} />
              <Input name="maxBeds" number placeholder="Max" register={register} maxLength={3} />
            </div>
          </div>
          <Dropdown
            options={Object.keys(agentMapping)}
            register={register}
            setValue={setValue}
            title="Agents" 
          />
          <div className="search-label search-label-long">
            Keywords
            <div className="search-input-container">
              <Input className="search-textarea" name="keywords" placeholder="Enter search keywords" register={register} />
            </div>
          </div>
          <div className="search-label search-label-long">
            Area
            <Multiselect
              data={locationChoices}
              filter='contains'
              textField='name'
              onChange={selected => setValue("area", selected)}
            />
          </div>
          
          <div className="search-label search-label-long search-label-radius">
            Search radius
            <div className="search-radius-slider">
              {renderSliderOption("1", "1", "0", true)}
              {renderSliderOption("2", "5", "5")}
              {renderSliderOption("3", "10", "10")}
              {renderSliderOption("4", "25", "25")}
              {renderSliderOption("5", "50", "50")}
              <div className="slider-cirle" />
            </div>
          </div>

          <div className="include-unknown-container">
            <h4 className="unknown-listings-title">
              A few listings are missing data, such as number of bedrooms or property size.{"\n"}Do you want to include these listings in your search?
            </h4>
            <h6 className="unknown-listings-subtitle">Include unknown...</h6>
            <div className="checkbox-container">
              <label className="checkbox-label">
                Number of rooms
                <input type="checkbox" {...register("inc_none_rooms")} />
              </label>
              <label className="checkbox-label">
                Number of bedrooms
                <input type="checkbox" {...register("inc_none_beds")} />
              </label>
              <label className="checkbox-label">
                Property size
                <input type="checkbox" {...register("inc_none_size")} />
              </label>
              <label className="checkbox-label">
                Land size
                <input type="checkbox" {...register("inc_none_plot")} />
              </label>
              <label className="checkbox-label">
                Location
                <input type="checkbox" {...register("inc_none_location")} />
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchForm;
