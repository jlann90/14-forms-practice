export default function Signup() {
  function handleSubmit(event) {
    event.preventDefault();

    // for the FormData constructor function to work, you need to have the "name" prop on all of your input fields you're collecting input from (including textarea inputs, select inputs, etc)
    const fd = new FormData(event.target);
    // example of getting email input using get method on our fd FormData object
    // const enteredEmail = fd.get("email");

    // Calling "entries()" on fd converts our FromData object to an array of the entries in the form, calling "fromEntries" on an Object and passing our new array as an argument converts this array to an Object with key/value pairs - this is basically taking what is in the form and creating an object we can see all of the input names as keys and the values that were submitted (doesn't work on multi value input fields like those grouped in fieldset below)
    const data = Object.fromEntries(fd.entries());
    // Below is an example on how to get multi value input fields (for example all fields with acquisition) and then we merge it into the data object we made above with the key of "acquisition"
    const acquisitionChannel = fd.getAll("acquisition");
    data.acquisition = acquisitionChannel;
    console.log(data);

    // Example of resetting, this will run when clicking submit since it's in handleSubmit
    // event.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        {/* the type "reset" on a button actually allows the button to reset the form */}
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
