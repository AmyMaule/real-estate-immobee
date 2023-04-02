import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import { 
  agentChoicesMapping,
  propertyTypeList
} from '../data';

import ChoicesInput from './ChoicesInput';
import Input from './Input';
import InputContainer from './InputContainer';

const SearchForm = ({ setSearch, setSearchQuery, setShowSearchResults }) => {
  const squaredSymbol = `${String.fromCharCode(178)}`;
  const [locationChoices, setLocationChoices] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const onSubmit = submitData => {
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
    setShowSearchResults(true);
  }

  const createChoicesObject = choicesList => {
    return choicesList.map(choice => ({
      value: choice,
      label: choice,
      selected: false
    })
  )}

  const propertyTypeChoices = createChoicesObject(propertyTypeList);
  const agentChoices = createChoicesObject(Object.keys(agentChoicesMapping));

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

  useEffect(() => {
    fetch("https://suspiciousleaf.pythonanywhere.com/postcode_dict/")
    .then(res => res.json())
    .then(data => {
      const postcodes = Object.keys(data);
      const locations = postcodes.map(postcode => (
        data[postcode].map(town => (
          `${town}, ${postcode}`
        ))
      )).flat();
      setLocationChoices(createChoicesObject(locations));
    });   
  }, []);

  if (!locationChoices.length) return null;

  return (
    <form className="search-criteria-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="row-container">
        <InputContainer double title="Price range (€)">
          <Input name="minPrice" number placeholder="Min" register={register} />
          <Input name="maxPrice" number placeholder="Max" register={register} />
        </InputContainer>

        <InputContainer double title="Property size">
          <Input name="minSize" number placeholder={`Min m${squaredSymbol}`} register={register} />
          <Input name="maxSize" number placeholder={`Max m${squaredSymbol}`} register={register} />
        </InputContainer>

        <InputContainer double title="Plot size">
          <Input name="minPlot" number placeholder={`Min m${squaredSymbol}`} register={register} />
          <Input name="maxPlot" number placeholder={`Max m${squaredSymbol}`} register={register} />
        </InputContainer>
      </div>
      
      <div className="row-container row-container-choices">
        <ChoicesInput
          choices={propertyTypeChoices}
          title="Property Type"
          register={register}
          setValue={setValue}
        />
        <InputContainer className="bedrooms" double title="No. of bedrooms">
          <Input name="minBeds" number placeholder="Min" register={register} />
          <Input name="maxBeds" number placeholder="Max" register={register} />
        </InputContainer>
      </div>

      <div className="row-container row-container-choices">
        <ChoicesInput 
          choices={locationChoices}
          title="Area"
          register={register}
          setValue={setValue}
        />
      </div>

      <div className="row-container row-container-slider">
        <label className="search-label">Search radius</label>
        <div className="search-radius-slider">
          {renderSliderOption("1", "1", "0", true)}
          {renderSliderOption("2", "5", "5")}
          {renderSliderOption("3", "10", "10")}
          {renderSliderOption("4", "25", "25")}
          {renderSliderOption("5", "50", "50")}
          <div className="slider-cirle" />
        </div>
      </div>

      <div className="row-container row-container-choices">
        <ChoicesInput
          choices={agentChoices}
          title="Agents"
          register={register}
          setValue={setValue}
        />
      </div>

      <div className="row-container">
        <InputContainer title="Keyword(s)">
          <Input name="keywords" placeholder="Enter search keywords" register={register} />
        </InputContainer>
      </div>

      <h4 className="unknown-listings-title">A few listings are missing data, such as number of bedrooms or property size.</h4>
      <h4 className="unknown-listings-title">Do you want to include these listings in your search?</h4>
      <h6 className="unknown-listings-subtitle">Include unknown...</h6>
      <div className="row-container row-container-checkbox">
        <label className="checkbox-label">
          Number of rooms
          <input type="checkbox" defaultChecked {...register("inc_none_rooms")} />
        </label>
        <label className="checkbox-label">
          Number of bedrooms
          <input type="checkbox" defaultChecked {...register("inc_none_beds")} />
        </label>
        <label className="checkbox-label">
          Property size
          <input type="checkbox" defaultChecked {...register("inc_none_size")} />
        </label>
        <label className="checkbox-label">
          Land size
          <input type="checkbox" defaultChecked {...register("inc_none_plot")} />
        </label>
      </div>

      <button className="btn-search" type="submit">Find properties</button>
    </form>
  )
}

export default SearchForm;
