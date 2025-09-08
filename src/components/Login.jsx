import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    // this prevents the browsers default behavior of sending a form http request to the server (causing the project to reload) in React apps
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    console.log(
      "Submitted" +
        " user email is " +
        enteredEmail +
        " user password is " +
        enteredPassword
    );

    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsInvalid(true);

      // by returning here we can ensure code below it won't execute - for example preventing an invalid http request if that were beneath this
      return;
    }

    // Example of resetting refs - same as the FormData approach
    event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input ref={email} id="email" type="email" name="email" />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input ref={password} id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
