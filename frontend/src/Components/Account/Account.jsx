import React, { useState } from 'react';
import './Account.scss';
import AccountSelect from '../AccountSelect/AccountSelect';
import Overlay from '../Overlay/Overlay';

export default function Account() {
  const [selectedOption, setSelectedOption] = useState('Тинькофф');
  const [isListOpen, setIsListOpen] = useState(false);

  const handleOptionChange = (value) => {
    setSelectedOption((prevSelectedOption) =>
      prevSelectedOption === value ? prevSelectedOption : value,
    );
  };

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const closeList = () => {
    setIsListOpen(false);
  };

  return (
    <section className="account">
      <h2 className="account__title">11 000</h2>
      <div className="account__selected-content">
        <button
          className={`account__selected ${isListOpen ? 'account__selected--open' : ''}`}
          onClick={toggleList}
        >
          <span className="account__arrow" />
          {selectedOption}
        </button>
      </div>
      <Overlay isOpen={isListOpen} onClose={closeList}>
        <AccountSelect handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
      </Overlay>
    </section>
  );
}
