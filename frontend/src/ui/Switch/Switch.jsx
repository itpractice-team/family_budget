import './Switch.scss';

export default function Switch({ label, onChange, disabled }) {
  const inputId = 'ios-switch';

  return (
    <label className={`switch__label ${disabled ? 'disabled' : ''}`} htmlFor={inputId}>
      <input
        className="switch__input-default"
        type="checkbox"
        id={inputId}
        name={inputId}
        onChange={onChange}
      />
      <span className="switch__checkbox-area">
        <span className="switch__toggle-point"> </span>
      </span>
      <span className="switch__label-text">{label}</span>
    </label>
  );
}

Switch.defaultProps = {
  label: 'primary',
  onChange: () => {},
  disabled: false,
};
