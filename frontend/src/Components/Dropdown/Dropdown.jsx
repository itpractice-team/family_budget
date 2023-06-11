import React from 'react';
import './Dropdown.scss';
import Radio from '../../ui/Radio/Radio';

export default function Dropdown({ options, selectedOption, onOptionChange }) {
  const handleRadioChange = (option) => {
    if (selectedOption !== option) {
      onOptionChange(option);
    }
  };

  return (
    <div className="dropdown">
      {options.map((option) => (
        <Radio
          key={option}
          text={option}
          value={option}
          isChecked={selectedOption === option}
          onChange={() => handleRadioChange(option)}
        />
      ))}
    </div>
  );
}
