import React, { useState, useEffect } from 'react';

const Dropdown = ({ options, register, setValue, showSelectedNames, title }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const inputName = title.toLowerCase().replaceAll(" ", "_");

  const handleSelect = e => {
    e.stopPropagation();
    const option = e.target.innerText;

    if (selected.indexOf(option) === -1) {
      if (!selected.length) {
        setValue(inputName, [option]);
      } else {
        setValue(inputName, [...selected, option]);
      }
      setSelected(prev => [...prev, option]);
    } else {
      setSelected(prev => prev.filter(p => p !== option));
      setValue(inputName, selected.filter(p => p !== option));
    }
  }
  
  const handleCloseDropdown = (e) => {
    // if the dropdown is open, and the user clicks on the "search-dropdown-input" element of ANOTHER dropdown, the first one should close
    // otherwise if they click the search-dropdown-input of the same dropdown that is open, it will be handled by handleSelect
    if (!e.target.classList.contains("search-dropdown-input") ||
       (e.target.classList.contains("search-dropdown-input") && e.target.previousElementSibling?.innerText !== title)) {
      setOpen(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener("click", handleCloseDropdown);
    return () => window.removeEventListener("click", handleCloseDropdown)
  }, []);

  return (
    <div className={`search-dropdown-container ${open ? "search-dropdown-container-open" : ""}`}>
    <label>{title}</label>
    <button
      className={`search-dropdown-input ${selected.length ? "search-dropdown-input-selected" : ""} ${open ? "search-dropdown-input-open" : ""}`}
      onClick={() => setOpen(prev => !prev)}
      type="button"
    >
      {selected.length 
        ? selected.length === 1
          ? showSelectedNames ? selected[0] : "1 selected"
          : selected.length + " selected"
        : "Select"}
      {open && 
        <div className="search-dropdown-options">
          {options.map(option => (
            <div
              className={`search-dropdown-option${selected.indexOf(option) !== -1 ? "-selected" : ""}`}
              onClick={handleSelect}
              key={option}
            >{option}</div>
          ))}
        </div>}
    </button>
  </div>
  )
}

export default Dropdown;
