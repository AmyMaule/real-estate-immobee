import React, { useState, useEffect } from 'react';

const CheckboxOption = ({ option, register, setValue, watch }) => {
  const [checked, setChecked] = useState(true);
  // if the user checks or unchecks the box, their choice overrides the default checking/unchecking when associated fields have values
  const [userChecked, setUserChecked] = useState(false);
  const watchFields = option.relatedFields.map(field => watch(field));

  const handleUserCheck = () => {
    setChecked(prev => !prev);
    if (!userChecked) setUserChecked(true);
  }

  useEffect(() => {
    if (!userChecked) {
      const fieldHasValue = option.relatedFields.some(field => watch(field) !== "" && watch(field) !== undefined);
      setChecked(!fieldHasValue);
      setValue(option.name, !fieldHasValue);
    }
  }, [option.name, option.relatedFields, setValue, userChecked, watch, watchFields]);

  return (
    <label className="checkbox-label" key={option.name}>
      {option.label}
      <input type="checkbox" {...register(option.name)} checked={checked} onClick={handleUserCheck}/>
    </label>
  )
}

export default CheckboxOption;
