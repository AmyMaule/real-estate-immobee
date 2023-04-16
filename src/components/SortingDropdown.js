import React, { useEffect, useRef } from 'react';

const SortingDropdown = () => {
  const dropdownRef = useRef();
  const dropdownItems = ["Price up", "Price down", "Town A - Z", "Town Z - A", "House size up", "House size down", "Garden size up", "Garden size down", "No. bedrooms up", "No. bedrooms down"];

  const renderArrow = direction => {
    return <span className={`dropdown-arrow dropdown-${direction}-arrow`}>{"\u279C"}</span>
  }

  const toggleDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("sorting-dropdown-open");
    }
  }

  const handleSort = e => {
    let target = e.target.classList.contains("dropdown-arrow")
      ? e.target.parentElement : e.target;
    let selectedItem = target.innerText;
    let arrow;

    // if arrow exist, find whether it is up or down
    if (target.innerText.indexOf("\u279C") !== -1) { 
      let arrowClassNames = [...target.lastElementChild.classList];
      arrowClassNames.forEach(className => {
        if (className !== "dropdown-arrow") {
          arrow = className.split("-")[1];
          selectedItem = selectedItem.replace("\n\u279C", ` ${arrow}`);
        }
      })
    }

    // selectedItem is now the item that has been clicked
  }

  const handleCloseDropdown = e => {
    const clickedItemClassNames = [...e.target.classList];

    // if the clicked item is not an element within the dropdown, and the dropdown is open, close it
    if (dropdownRef.current.classList.contains("sorting-dropdown-open")) {
      for (let className of clickedItemClassNames) {
        if (className.indexOf("sorting-dropdown") !== -1) return;
      }
      dropdownRef.current.classList.remove("sorting-dropdown-open");
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);
    return () => document.removeEventListener("click", handleCloseDropdown);
  }, []);

  return (
    <ul className="sorting-dropdown-container">
      <li className="sorting-dropdown" ref={dropdownRef} onClick={toggleDropdown}>
        <h2 className="sorting-dropdown-title">Sort by</h2>
        <ul className="sorting-dropdown-items">
          {dropdownItems.map(item => {
            // split the item by space and if the last word is up/down, render an arrow instead
            let itemArr = item.split(" ");
            const lastItem = itemArr[itemArr.length - 1];
            let arrow = lastItem === "up" || lastItem === "down" ? itemArr.pop() : "";
            return (
              <li className="sorting-dropdown-item" key={item} onClick={handleSort}>
                {itemArr.join(" ")}
                {arrow && renderArrow(arrow)}
              </li>)
          })}
        </ul>
      </li>
    </ul>
  )
}

export default SortingDropdown;
