import React from 'react';
import './Dropdown.scss';
import Radio from '../../ui/Radio/Radio';

export default function Dropdown({ options, selectedOption, onOptionChange }) {
  const handleRadioChange = (option) => {
    onOptionChange(option);
  };

  return (
    <div className="dropdown">
      {options.map((option) => {
        return (
          <Radio
            key={option}
            text={option}
            value={option}
            isChecked={selectedOption === option}
            onChange={() => handleRadioChange(option)}
          />
        );
      })}
    </div>
  );
}
