import React from 'react';

const SearchSliderOption = ({ id, value, radius, register, defaultChecked }) => {
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

export default SearchSliderOption;
