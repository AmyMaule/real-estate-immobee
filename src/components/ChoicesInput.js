import React, { useEffect, useRef } from 'react';
import Choices from 'choices.js';

const ChoicesInput = ({ choices, register, setValue, title }) => {
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
      new Choices(choicesRef.current, {
        removeItemButton: true,
        duplicateItemsAllowed: false,
        noChoicesText: "No items to choose from",
        itemSelectText: "",
        resetScrollPosition: false,
        allowHTML: true,
        choices: choices,
        placeholderValue: "Type to search"
      });
    }
  });

  return (
    <div className="search-field-container">
      <div className="choices-container">
        <label className="search-label-choices">{title}</label>
          <div className="input-container" {...register(inputName)}>
            <select ref={choicesRef} multiple onChange={setChoices}></select>
          </div>
      </div>
    </div>
  )
}

export default ChoicesInput;
