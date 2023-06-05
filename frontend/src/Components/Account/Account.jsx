import React, { useState } from 'react';
import './Account.scss';
import AccountSelect from '../AccountSelect/AccountSelect';

export default function Account() {
  const [selectedOption, setSelectedOption] = useState('Тинькофф');
  const [isListOpen, setIsListOpen] = useState(false);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setIsListOpen(false);
  };

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <section className="account">
      <h2 className="account__title">11 000 ₽</h2>
      <div className="account__selected-content">
        <button
          className={`account__selected ${isListOpen ? 'account__selected--open' : ''}`}
          onClick={toggleList}
        >
          <span className="account__arrow" />
          {selectedOption}
        </button>
      </div>
      {isListOpen && (
        <AccountSelect handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
      )}
    </section>
  );
}
