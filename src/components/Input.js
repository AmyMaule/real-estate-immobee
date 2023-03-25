import React from 'react';

const Input = ({ className, double, title, placeholders}) => { 
  return (
    <div className={`search-field-container ${className || double ? "search-field-container-" + (className || "double") : ""}`}>
      <label className="search-label">{title}</label>
      <div className={`input-container ${className || double ? "input-container-" + (className || "double") : ""}`}>
        <input className="search-input" placeholder={placeholders[0]} />
        {double && <input className="search-input" placeholder={placeholders[1]} />}
      </div>
    </div>
  )
}

export default Input;
