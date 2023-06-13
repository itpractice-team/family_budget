/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div className="input__wrapper">
      <label className="input__label">{label}</label>
      <input
        className="input__field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
