/* eslint-disable react/no-array-index-key */
import React from 'react';
import './AccountSelect.scss';
import Button from '../../ui/Button/Button';

export default function AccountSelect({ handleOptionChange, selectedOption }) {
  const options = ['Тинькофф', 'ВТБ', 'СБЕР'];

  const handleSelectOption = (value) => {
    handleOptionChange(value);
  };

  return (
    <div className="account-select__list">
      {options.map((option, index) => (
        <label
          key={index}
          className="form__input-label form__input-label_radio"
          htmlFor={`option${index}`}
        >
          {option}
          <input
            className="form__radio"
            type="radio"
            id={`option${index}`}
            value={option}
            checked={selectedOption === option}
            onChange={() => handleSelectOption(option)}
          />
        </label>
      ))}
      <Button
        variant="secondary"
        type="text"
        text="Добавить/Редактировать"
        size="medium"
        extraClass="button__account"
      />
    </div>
  );
}
