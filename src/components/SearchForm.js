import React from 'react';
import { useForm } from "react-hook-form";

import { 
  agentChoicesList,
  propertyTypeList
} from '../data';

import ChoicesInput from './ChoicesInput';
import Input from './Input';
import InputContainer from './InputContainer';

const SearchForm = () => {
  const squaredSymbol = `${String.fromCharCode(178)}`;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const onSubmit = submitData => {
    console.log(submitData);
  }

  const createChoicesObject = choicesList => {
    return choicesList.map(choice => ({
      value: choice,
      label: choice,
      selected: false
    })
  )}

  const propertyTypeChoices = createChoicesObject(propertyTypeList);
  const agentChoices = createChoicesObject(agentChoicesList);

  return (
    <form className="search-criteria-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="row-container">
        <InputContainer double title="Price range (€)">
          <Input name="minPrice" number placeholder="Min" register={register} />
          <Input name="maxPrice" number placeholder="Max" register={register} />
        </InputContainer>

        <InputContainer double title="Property size">
          <Input name="minSize" number placeholder={`Min m${squaredSymbol}`} register={register} />
          <Input name="maxSize" number placeholder={`Max m${squaredSymbol}`} register={register} />
        </InputContainer>

        <InputContainer double title="Plot size">
          <Input name="minPlot" number placeholder={`Min m${squaredSymbol}`} register={register} />
          <Input name="maxPlot" number placeholder={`Max m${squaredSymbol}`} register={register} />
        </InputContainer>
      </div>
      
      <div className="row-container row-container-choices">
        <ChoicesInput
          choices={propertyTypeChoices}
          title="Property Type"
          register={register}
          setValue={setValue}
        />
        <InputContainer className="bedrooms" double title="No. of bedrooms">
          <Input name="minBedrooms" number placeholder="Min" register={register} />
          <Input name="maxBedrooms" number placeholder="Max" register={register} />
        </InputContainer>
      </div>

      <div className="row-container">
        <InputContainer title="Keyword(s)">
          <Input name="keywords" placeholder="Enter search keywords" register={register} />
        </InputContainer>
        <InputContainer title="Search area">
          <Input name="postcode" number placeholder="Enter postcode" register={register} />
        </InputContainer>
      </div>

      <div className="row-container row-container-choices">
        <ChoicesInput
          choices={agentChoices}
          title="Agent"
          register={register}
          setValue={setValue}
        />
      </div>

      <button className="btn-search" type="submit">Find properties</button>
    </form>
  )
}

export default SearchForm;
