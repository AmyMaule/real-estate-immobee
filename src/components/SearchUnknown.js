import React from 'react';

const SearchUnknown = ({ register }) => {
  const checkboxOptions = [
    { label: "Number of rooms", name: "inc_none_rooms" },
    { label: "Number of bedrooms", name: "inc_none_beds" },
    { label: "Property size", name: "inc_none_size" },
    { label: "Land size", name: "inc_none_plot" },
    { label: "Location", name: "inc_none_location" }
  ];

  return (
    <div className="include-unknown-container">
      <h4 className="unknown-listings-title">
        A few listings are missing data, such as number of bedrooms or property size.{"\n"}Do you want to include these listings in your search?
      </h4>
      <h6 className="unknown-listings-subtitle">Include unknown...</h6>
      <div className="checkbox-container">
        {checkboxOptions.map(option => (
          <label className="checkbox-label" key={option.name}>
            {option.label}
            <input type="checkbox" {...register(option.name)} />
          </label>
        ))}
      </div>
    </div>
  )
}

export default SearchUnknown;
