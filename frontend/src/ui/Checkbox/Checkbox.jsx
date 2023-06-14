import './Checkbox.scss';

export default function Checkbox({
  nameProp,
  text,
  icon,
  isChecked,
  onChange,
  disabled,
  extraClass,
}) {
  const checkboxClasses = `checkbox ${disabled ? 'disabled' : ''} ${extraClass}`;
  const inputId = `checkbox-input-${Math.random().toString(36).slice(2, 9)}`; // Генерация уникального идентификатора
  return (
    <label className={checkboxClasses} htmlFor={inputId}>
      <input
        className="checkbox__input"
        type="checkbox"
        id={inputId}
        name={nameProp}
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
      />

      {icon && (
        <div className="checkbox__icon-wrapper">
          <span className="checkbox__icon">
            <img src={icon} alt="Ckeckbox-icon" className="checkbox__image" />
          </span>
        </div>
      )}
      {text && <span className="checkbox__text">{text}</span>}
    </label>
  );
}
