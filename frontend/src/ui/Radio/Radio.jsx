import React from 'react';
import './Radio.scss';

export default function Radio({ text, icon, value, isChecked, onChange, disabled, extraClass }) {
  const radioClasses = `radio ${disabled ? 'disabled' : ''} ${extraClass}`;
  const inputId = `radio-input-${Math.random().toString(36).slice(2, 9)}`; // Generate a unique ID

  return (
    <label className={radioClasses} htmlFor={inputId}>
      <input
        className="radio__input"
        type="radio"
        id={inputId}
        name="radio-group"
        value={value}
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="radio__circle"> </span>
      {icon && <img src={icon} alt="Icon" className="radio__icon" />}
      {text && <span className="radio__text">{text}</span>}
    </label>
  );
}

Radio.defaultProps = {
  text: '',
  icon: '',
  value: '',
  isChecked: false,
  onChange: () => {},
  disabled: false,
  extraClass: '',
};
