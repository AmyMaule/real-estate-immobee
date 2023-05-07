import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import Multiselect from "react-widgets/Multiselect";

import { 
  agentMapping,
  propertyTypeMapping
} from '../data';

import { scrollTo } from '../utilities';

import Dropdown from './Dropdown';
import Input from './Input';
import SearchSlider from './SearchSlider';
import SearchTextarea from './SearchTextarea,';
import SearchUnknown from './SearchUnknown';

// add tooltip to explain to users they can select department OR area - also make sure one disables as the other gains a value
// figure out why the smooth scroll isn't working on last page of listings

const SearchForm = ({ search, setListings, setLoadingListings, setLoadingTimer, setNoListingsFound, setSearch, setSearchQuery }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [locationChoices, setLocationChoices] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minHeight, setMinHeight] = useState(window.innerHeight + 64);
  const departmentOptions = ["Aude (11)", "Ariège (09)", "Haute-Garonne (31)", "Hérault (34)", "Pyrenées-Orientales (66)"];
  const searchFormRef = useRef();

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
    const incNoneValues = ["inc_none_beds", "inc_none_rooms", "inc_none_size", "inc_none_plot", "inc_none_location"];
    incNoneValues.forEach(value => {
      if (submitData[value] === false) {
        searchQuery[value] = submitData[value];
      }
    })
    setSearchQuery(searchQuery);
  }

  const handleUpdateHeight = () => {
    if (searchFormRef.current) {
      setMinHeight(searchFormRef.current.clientHeight + 400);
    }
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

  // the height of the hero container shouldn't be updated until the search form is fully expanded
  useEffect(() => {
    if (searchFormRef.current) {
      const searchForm = searchFormRef.current;
      searchForm.addEventListener("animationend", handleUpdateHeight);
      return () => searchForm.removeEventListener("animationend", handleUpdateHeight);
    }
  }, [searchFormRef.current]);

  useEffect(() => {
    if (!showAdvanced) scrollTo(0);
  }, [showAdvanced]);

  if (!locationChoices.length) return null;

  return (
    <div className="hero-section" style={{height: minHeight}}>
      <div className="hero-section-overlay" />
      <h1 className="hero-section-title">Find your dream home</h1>
      <form className="search-form-container" onSubmit={handleSubmit(onSubmit)} ref={searchFormRef}>
        <div className="search-label">
          Price range (€)
          <div className="search-input-container">
            <Input name="minPrice" number placeholder="Min" register={register} maxLength={7} />
            <Input name="maxPrice" number placeholder="Max" register={register} maxLength={7} />
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
          <div className="search-label search-label-multiselect">
            Agents
            <Multiselect
              data={Object.keys(agentMapping)}
              filter='contains'
              onChange={selected => setValue("agents", selected)}
              showSelectedItemsInList
            />
          </div>
          <div className="search-label search-label-long">
            Keywords
            <SearchTextarea 
              handleUpdateHeight={handleUpdateHeight}
              register={register}
            />
          </div>
          <div className="search-label search-label-long search-label-multiselect">
            Area
            <Multiselect
              data={locationChoices}
              filter='contains'
              onChange={selected => setValue("area", selected)}
              showSelectedItemsInList
            />
          </div>
          <SearchSlider register={register} />
          <SearchUnknown register={register} />
        </div>
      </form>
    </div>
  )
}

export default SearchForm;
