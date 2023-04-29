import React from 'react';

import SearchSliderOption from './SearchSliderOption';

const SearchSlider = ({ register }) => {
  const options = [
    { radius: "0", value: "1" },
    { radius: "5" },
    { radius: "10" },
    { radius: "25" },
    { radius: "50" }
  ];

  return (
    <div className="search-label search-label-long search-label-radius">
      Search radius
      <div className="search-radius-slider">
        {options.map((option, i) => (
          <SearchSliderOption
            key={option.radius}
            defaultChecked={i === 0}
            id={i}
            radius={option.radius}
            register={register}
            value={option.value ?? option.radius}
          />
        ))}
        <div className="slider-cirle" />
      </div>
    </div>
  )
}

export default SearchSlider;
