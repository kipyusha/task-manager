function Input({ type, value, onChange, label }) {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        placeholder={value}
        value={value}
        className="form-control"
        onChange={onChange}
      />
      <label className="text-secondary">{label}</label>
    </div>
  );
}

export default Input;
