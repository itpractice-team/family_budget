/* eslint-disable jsx-a11y/label-has-associated-control */
import SelectButton from '../../ui/SelectButton/SelectButton';
import Overlay from '../Overlay/Overlay';
import Select from '../Select/Select';
import useDropdown from '../../utils/hooks/useDropdown';

export default function SelectButtonWrapper({
  label,
  options,
  initialValue,
  imageKey,
  nameKey,
  altText,
  handleOptionChange,
}) {
  const dropdown = useDropdown(initialValue, options);

  const handleOptionChangeWrapper = (value) => {
    dropdown.handleOptionChange(value);
    handleOptionChange(value);
  };

  return (
    <div className="form__input-block">
      <label className="form__input-label">
        {label}
        <SelectButton
          isOpen={dropdown.isDropdownOpen}
          toggleList={dropdown.toggleDropdown}
          options={options}
          selectedOption={dropdown.selectedOption}
          imageKey={imageKey}
          nameKey={nameKey}
          altText={altText}
          handleOptionChange={handleOptionChangeWrapper}
        />
        <Overlay isOpen={dropdown.isDropdownOpen} onClose={dropdown.toggleDropdown}>
          <Select
            handleOptionChange={handleOptionChangeWrapper}
            selectedOption={dropdown.selectedOption}
            options={options}
          />
        </Overlay>
      </label>
    </div>
  );
}
