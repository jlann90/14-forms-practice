import { useState } from "react";
import Input from "./Input.jsx";

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
  const passwordIsInvalid =
    didEdit.password && !enteredValues.password.trim().length < 6;

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
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => handleInputChange("email", event.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && "Please enter a valid email"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur("password")}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          value={enteredValues.password}
          error={passwordIsInvalid && "Please enter a valid password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
