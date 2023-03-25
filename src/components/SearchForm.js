import React from 'react';

import ChoicesInput from './ChoicesInput';
import Input from './Input';

const SearchForm = () => {
  const squared = `${String.fromCharCode(178)}`;

  const createChoicesObject = (choicesList) => {
    return choicesList.map(choice => ({
      value: choice,
      label: choice,
      selected: false
    })
  )}

  const propertyTypeList = ["Maison", "Terrain", "Immeuble", "Appartement"];
  const propertyTypeChoices = createChoicesObject(propertyTypeList);
  const agentChoicesList = ["Cabinet Jammes", "Time and Stone Immobilier", "Aude Immobilier", "Richardson Immobilier", "Cimm Immobilier", "Arthur Immo", "M&M Immobilier", "Nestenn", "A.P.I.", "Ami Immobilier"];
  const agentChoices = createChoicesObject(agentChoicesList);


  const handleFormSubmit = e => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <form className="search-criteria-container">
      <div className="row-container">
        <Input double title="Price range (€)" placeholders={["Min", "Max"]}/>
        <Input double title="Property size" placeholders={[`Min m${squared}`, `Max m${squared}`]} />
        <Input double title="Plot size" placeholders={[`Min m${squared}`, `Max m${squared}`]} />
      </div>
      
      <div className="row-container row-container-choices">
        <ChoicesInput choices={propertyTypeChoices} title="Property type" />
        <Input className="bedrooms" double title="No. of bedrooms" placeholders={["Min", "Max"]} />
      </div>

      <div className="row-container">
        <Input title="Keyword(s)" placeholders={["Enter search keywords"]} />

        <div className="search-field-container">
          <label className="search-label">Search area</label>
          <div className="input-container">
            <input className="search-input" placeholder="Enter postcode" />
          </div>
        </div>
      </div>

      <div className="row-container row-container-choices">
        <ChoicesInput choices={agentChoices} title="Agent" />
      </div>

      <button className="btn-search" type="submit" onClick={handleFormSubmit}>Find properties</button>
    </form>
  )
}

export default SearchForm;
