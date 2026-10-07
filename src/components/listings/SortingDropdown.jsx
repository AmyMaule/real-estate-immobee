import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { defaultPage, defaultSortBy } from "../../data";

const SortingDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef();

  const sortingOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: low to high", value: "price_asc" },
    { label: "Price: high to low", value: "price_desc" },
    { label: "House size: ascending", value: "house_size_asc" },
    { label: "House size: descending", value: "house_size_desc" },
    { label: "Land size: ascending", value: "land_size_asc" },
    { label: "Land size: descending", value: "land_size_desc" },
    { label: "Agent: A-Z", value: "agent_az" },
    { label: "Agent: Z-A", value: "agent_za" },
  ];

  const currentSort = searchParams.get("sort");
  const selectedOption = sortingOptions.find(
    option => option.value === currentSort
  );

  const toggleDropdown = () => dropdownRef.current?.classList.toggle("open");

  const handleSort = value => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set("sort", value);
      params.set("page", defaultPage);
      return params;
    });
    dropdownRef.current?.classList.remove("open");
  }

  const handleCloseDropdown = (e) => {
    if (
      dropdownRef.current &&
      dropdownRef.current.classList.contains("open") &&
      !dropdownRef.current.contains(e.target)
    ) {
      dropdownRef.current.classList.remove("open");
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);
    return () => document.removeEventListener("click", handleCloseDropdown);
  }, []);

  return (
    <div
      className="sorting-dropdown-container"
      ref={dropdownRef}
      onClick={toggleDropdown}
    >
      <div className="sorting-dropdown-title">
        {selectedOption?.label || sortingOptions.find(option => option.value === defaultSortBy)?.label}
      </div>

      <ol className="sorting-dropdown">
        {sortingOptions.map(option => (
          <li
            className="sorting-dropdown-item"
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              handleSort(option.value);
            }}
          >
            {option.label}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default SortingDropdown;
