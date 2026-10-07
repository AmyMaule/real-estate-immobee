import React, { useState, useEffect } from 'react';

const CheckboxOption = ({ option, register, setValue, watch, urlValue }) => {
  const [checked, setChecked] = useState(true);
  // if the user checks or unchecks the box, their choice overrides the default checking/unchecking when associated fields have values
  const [userChecked, setUserChecked] = useState(false);
  const watchFields = option.relatedFields.map(field => watch(field));

  const handleUserCheck = () => {
    setChecked(prev => !prev);
    setUserChecked(true);
  }

  useEffect(() => {
    // The user checking/unchecking the box takes priority
    if (userChecked) return;

    // If the checkbox has a value from the URL, this gets next priority
    if (urlValue !== null) {
      const value = urlValue === "true";
      setChecked(value);
      setValue(option.name, value);
      return;
    }

    // Otherwise calculate the default from the related fields
    if (!userChecked) {
      const fieldHasValue = option.relatedFields.some(field => {
        const value = watch(field);
        return Array.isArray(value) ? value.length > 0 : value !== "" && value !== undefined;
      });
      setChecked(!fieldHasValue);
      setValue(option.name, !fieldHasValue);
    }
  }, [option.name, option.relatedFields, setValue, userChecked, watch, watchFields, urlValue]);

  return (
    <label className="checkbox-label" key={option.name}>
      {option.label}
      <input type="checkbox" {...register(option.name)} checked={checked} onClick={handleUserCheck} />
    </label>
  )
}

export default CheckboxOption;
