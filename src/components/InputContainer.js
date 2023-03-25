import React from 'react';

const InputContainer = ({ children, className, double, title}) => { 
  return (
    <div className={`search-field-container ${className || double ? "search-field-container-" + (className || "double") : ""}`}>
      <label className="search-label">{title}</label>
      <div className={`input-container ${className || double ? "input-container-" + (className || "double") : ""}`}>
        {children}
      </div>
    </div>
  )
}

export default InputContainer;
