import './Radio.scss';

export default function Radio({nameProp, text, icon, value, isChecked, onChange, disabled, extraClass }) {
  const radioClasses = `radio ${disabled ? 'disabled' : ''} ${extraClass}`;
  const inputId = `radio-input-${Math.random().toString(36).slice(2, 9)}`; // Генерация уникального идентификатора

  return (
    <label className={radioClasses} htmlFor={inputId}>
      <input
        className="radio__input"
        type="radio"
        id={inputId}
        name={nameProp}
        value={value}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
      />
      <span className="radio__circle"> </span>
      {icon && <img src={icon} alt="Icon" className="radio__icon" />}
      {text && <span className="radio__text">{text}</span>}
    </label>
  );
}

Radio.defaultProps = {
  nameProp: '',
  text: '',
  icon: '',
  value: '',
  isChecked: false,
  onChange: () => {},
  disabled: false,
  extraClass: '',
};
