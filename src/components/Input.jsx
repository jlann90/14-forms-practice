export default function Input({ label, id, error, ...props }) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">
        {/* this is where we are implementing our keystroke error */}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
