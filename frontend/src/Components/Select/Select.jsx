import './Select.scss';
import Dropdown from '../Dropdown/Dropdown';

export default function Select({ handleOptionChange, selectedOption, options }) {
  return (
    <div className="select">
      <Dropdown
        options={options}
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
      />
    </div>
  );
}
