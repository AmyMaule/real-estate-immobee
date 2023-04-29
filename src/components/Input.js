import React, { useState } from 'react';

const Input = ({ className, maxLength, name, number, placeholder, register }) => {
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
      className={className ? `search-input ${className}` : "search-input"}
      maxLength={maxLength || null}
      placeholder={placeholder}
      {...register(name)}
      onInput={handleNumberInput}
      value={inputValue.toLocaleString()}
    />
  )
}

export default Input;
