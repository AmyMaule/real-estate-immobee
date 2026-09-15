import React from 'react';

import CheckboxOption from './CheckboxOption';

const SearchUnknown = ({ register, setValue, watch }) => {
  const checkboxOptions = [
    { label: "Number of bedrooms", name: "include_unknown_bedrooms", relatedFields: ["min_bedrooms", "max_bedrooms"] },
    { label: "Property size", name: "include_unknown_building_area", relatedFields: ["min_building_area_m2", "max_building_area_m2"] },
    { label: "Land size", name: "include_unknown_land_area", relatedFields: ["min_land_area_m2", "max_land_area_m2"] },
    { label: "Location", name: "include_unknown_locations", relatedFields: ["department", "area"] }
  ];

  return (
    <div className="include-unknown-container">
      <h4 className="unknown-listings-title">
        A few listings are missing data, such as the size of the property, or where it is located.{"\n"}Do you want to include these listings in your search?
      </h4>
      <h6 className="unknown-listings-subtitle">Include unknown...</h6>
      <div className="checkbox-container">
        {checkboxOptions.map(option => (
          <CheckboxOption
            key={option.name}
            option={option}
            register={register}
            setValue={setValue}
            watch={watch}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchUnknown;
