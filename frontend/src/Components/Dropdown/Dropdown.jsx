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
            key={option.id}
            text={option.name}
            icon={option.image}
            value={option.id}
            isChecked={selectedOption === option.id}
            onChange={() => handleRadioChange(option.id)}
          />
        );
      })}
    </div>
  );
}
