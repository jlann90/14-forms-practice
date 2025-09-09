import Input from "./Input.jsx";
import { useInput } from "../hooks/useInput.js";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";

export default function Login() {
  //call in our custom useInput hooks, one for Input and one for PW
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => {
    return isEmail(value) && isNotEmpty(value);
  });
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => {
    return hasMinLength(value, 6);
  });

  function handleSubmit(event) {
    // this prevents the browsers default behavior of sending a form http request to the server (causing the project to reload) in React apps
    event.preventDefault();
    console.log("Submitted");
    console.log("Email: " + emailValue);
    console.log("Password: " + enteredValues.password);

    // example of resetting the form after the submit, just resetting the state to the default values
    setEnteredValues({
      email: "",
      password: "",
    });
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
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
