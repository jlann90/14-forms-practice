import { useState } from "react";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  //create a state to track the focus of the user - via onBlur prop on inputs
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  // example of validating on lost focus(using didEdit state check) and on keystroke (checking if entered value includes an @) - this is creating an error that appears when the following conditions are met
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  function handleSubmit(event) {
    // this prevents the browsers default behavior of sending a form http request to the server (causing the project to reload) in React apps
    event.preventDefault();
    console.log("Submitted");
    console.log("Email: " + enteredValues.email);
    console.log("Password: " + enteredValues.password);

    // example of resetting the form after the submit, just resetting the state to the default values
    setEnteredValues({
      email: "",
      password: "",
    });
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    // update this to incorporate our did edit state, so that when the focus is reselected, the error goes away until they click off of it (and don't meet the other criteria)
    setDidEdit((prevEdit) => ({ ...prevEdit, [identifier]: false }));
  }

  // handler that tracks our didEdit state for validation
  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({ ...prevEdit, [identifier]: true }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            value={enteredValues.email}
            onBlur={() => handleInputBlur("email")}
            onChange={(event) => handleInputChange("email", event.target.value)}
            id="email"
            type="email"
            name="email"
          />
          <div className="control-error">
            {/* this is where we are implementing our keystroke error */}
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            value={enteredValues.password}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            id="password"
            type="password"
            name="password"
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
