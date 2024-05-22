import React, { useState } from 'react';

const Input = ({ className, maxLength, name, number, placeholder, register, setValue }) => {
  const [inputValue, setInputValue] = useState("");

  // ensure only numbers can be typed in number inputs
  const handleNumberInput = e => {
    let value = e.target.value;
    if (number) {
      value = value.replace(/[^0-9]/g, "");
    }
    // use setValue in order to link the value of the inputs to the checkboxes below - the checkboxes untick if the corresponding input has a value, but "watch" uses the value before handleNumberInput runs unless setValue is invoked
    const newValue = number ? parseInt(value) || "" : value;
    setValue(name, newValue);
    setInputValue(newValue);
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
