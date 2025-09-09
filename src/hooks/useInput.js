import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  //create a state to track the focus of the user - via onBlur prop on inputs
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValues(event.target.value);
    // update this to incorporate our did edit state, so that when the focus is reselected, the error goes away until they click off of it (and don't meet the other criteria)
    setDidEdit(false);
  }

  // handler that tracks our didEdit state for validation
  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
