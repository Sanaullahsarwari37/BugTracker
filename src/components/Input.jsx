export default function Input({ type, className, placeholder, value, handleOnChange, onClick, checked }) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      onClick={onClick}
      checked={checked}
    />
  );
}