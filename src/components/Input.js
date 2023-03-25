import React, { useState } from 'react';

const Input = ({ name, number, placeholder, register }) => {
  const [inputValue, setInputValue] = useState("");

  // ensure only numbers can be typed in number inputs
  const handleNumberInput = e => {
    let value = e.target.value;
    if (number) {
      [...value].forEach((char, i) => {
        if (char.charCodeAt(0) < 48 || char.charCodeAt(0) > 57) {
          value = value.replace(char, "");
        }
      });
    }
    setInputValue(value);
  }

  return (
    <input
      className="search-input"
      placeholder={placeholder}
      {...register(name)}
      onInput={handleNumberInput}
      value={inputValue}
    />
  )
}

export default Input;
