/* eslint-disable react/no-array-index-key */
import React from 'react';
import './AccountSelect.scss';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button/Button';
import { toggleAccountsPopup } from '../../store/slices/togglePopupSlice';
import AccountsPopup from '../AccountsPopup/AccountsPopup';

export default function AccountSelect({ handleOptionChange, selectedOption, onClose }) {
  const dispatch = useDispatch();

  const isAccountsPopupOpen = useSelector((state) => state.popup.isAccountsPopupOpen);

  const options = ['Тинькофф', 'ВТБ', 'СБЕР'];

  const handleSelectOption = (value) => {
    handleOptionChange(value);
  };

  const handleAccountsClick = (evt) => {
    evt.preventDefault();
    dispatch(toggleAccountsPopup(true));
    onClose();
  };

  const closeAccountsPopup = () => {
    dispatch(toggleAccountsPopup(false));
    onClose();
  };

  return (
    <>
      {isAccountsPopupOpen && <AccountsPopup onClose={closeAccountsPopup} />}
      {isAccountsPopupOpen ? null : (
        <div className="account-select__list">
          <p className="account-select__list-title">Все счета</p>
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
            onClick={handleAccountsClick}
          />
        </div>
      )}
    </>
  );
}
