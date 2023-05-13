import React from 'react';

import CheckboxOption from './CheckboxOption';

const SearchUnknown = ({ register, watch }) => {
  const checkboxOptions = [
    { label: "Number of bedrooms", name: "inc_none_beds", relatedFields: ["minBeds", "maxBeds"] },
    { label: "Property size", name: "inc_none_size", relatedFields: ["minSize", "maxSize"] },
    { label: "Land size", name: "inc_none_plot", relatedFields: ["minPlot", "maxPlot"] },
    { label: "Location", name: "inc_none_location", relatedFields: ["department", "area"] }
  ];

  return (
    <div className="include-unknown-container">
      <h4 className="unknown-listings-title">
        A few listings are missing data, such as the size of the property, or where it is located.{"\n"}Do you want to include these listings in your search?
      </h4>
      <h6 className="unknown-listings-subtitle">Include unknown...</h6>
      <div className="checkbox-container">
        {checkboxOptions.map(option => (
          <CheckboxOption key={option.name} option={option} register={register} watch={watch} />
        ))}
      </div>
    </div>
  )
}

export default SearchUnknown;
