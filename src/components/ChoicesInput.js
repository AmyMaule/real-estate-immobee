import React, { useEffect, useRef } from 'react';
import Choices from 'choices.js';

const ChoicesInput = ({ choices, title }) => {
  const choicesRef = useRef();

  useEffect(() => {
    if (choicesRef.current) {
      console.log(choicesRef.current)

      new Choices(choicesRef.current, {
        removeItemButton: true,
        duplicateItemsAllowed: false,
        searchResultLimit: 10,
        noChoicesText: "No items to choose from",
        itemSelectText: "",
        resetScrollPosition: false,
        allowHTML: true,
        choices: choices,
      });
    }
  });

  return (
    <div className="search-field-container">
      <div className="choices-container">
        <label className="search-label-choices">{title}</label>
          <div className="input-container">
            <select ref={choicesRef} placeholder="Type to search" multiple></select>
          </div>
      </div>
    </div>
  )
}

export default ChoicesInput;
