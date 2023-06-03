import './Button.scss';

export default function Button({ variant, type, text, size, disabled, extraClass, onClick }) {
  const buttonClasses = `button ${extraClass} ${variant} ${size} ${disabled ? 'disabled' : ''} ${
    type === 'icon' ? 'rounded' : ''
  }`;

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      {type === 'text' && <span className="button-text">{text}</span>}
      {type === 'icon-text' && (
        <>
          <span className="button-icon"> </span>
          <span className="button-text">{text}</span>
        </>
      )}
      {type === 'icon' && <span className="button-icon"> </span>}
    </button>
  );
}
