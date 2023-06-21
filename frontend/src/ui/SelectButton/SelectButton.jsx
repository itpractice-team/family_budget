import './SelectButton.scss';

function SelectButton({ isOpen, toggleList, options, selectedOption, imageKey, nameKey, altText }) {
  return (
    <button
      className={`button-select ${isOpen ? 'button-select--open' : ''}`}
      type="button"
      onClick={toggleList}
    >
      {selectedOption && (
        <>
          <img
            src={options.find((option) => option.id === selectedOption)?.[imageKey]}
            className="button-select__icon"
            alt={altText}
          />
          {options.find((option) => option.id === selectedOption)?.[nameKey]}
        </>
      )}
      <span className="button-select__arrow" />
    </button>
  );
}

export default SelectButton;
