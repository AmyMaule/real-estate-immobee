import React, { useState, useEffect, useRef } from 'react';
import Choices from 'choices.js';

const ChoicesInput = ({ choices, register, setValue, title }) => {
  const [loading, setLoading] = useState(true);
  // camelCase the title
  const inputName = title[0].toLowerCase() + title.slice(1).replace(" ", "");
  const choicesRef = useRef();

  const setChoices = (e) => {
    const selectedChoices = e.target.children;
    if (!selectedChoices.length) {
      setValue(inputName, "");
    } else {
      let selectedChoiceNames = [];
      [...selectedChoices].forEach(choice => {
        selectedChoiceNames.push(choice.value);
      });
      setValue(inputName, selectedChoiceNames);
    }
  }

  useEffect(() => {
    if (choicesRef.current) {
      setLoading(false);
      new Choices(choicesRef.current, {
        removeItemButton: true,
        duplicateItemsAllowed: false,
        noChoicesText: "No items to choose from",
        itemSelectText: "",
        resetScrollPosition: false,
        allowHTML: true,
        choices: choices,
        placeholderValue: "Type to search",
        searchResultLimit: 10
      });
    }
  }, []);

  return (
    <div className="search-field-container">
      <div className="choices-container">
        <label className="search-label-choices">{title}</label>
          <div className="input-container" {...register(inputName)} style={{display: loading ? "none" : "flex"}}>
            <select ref={choicesRef} multiple onChange={setChoices}></select>
          </div>
          {loading && <input className="search-input input-choices-loading" placeholder="Type to search" />}
      </div>
    </div>
  )
}

export default ChoicesInput;
