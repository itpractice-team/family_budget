import React from 'react';
import './AccountSelect.scss';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button/Button';
import { toggleAccountPopup } from '../../store/slices/togglePopupSlice';
import AccountPopup from '../AccountPopup/AccountPopup';
import Radio from '../../ui/Radio/Radio';

export default function AccountSelect({ handleOptionChange, selectedOption }) {
  const dispatch = useDispatch();

  const isAccountPopupOpen = useSelector((state) => state.popup.isAccountPopupOpen);

  const options = ['Тинькофф', 'СБЕР', 'Наличные', 'Другой счёт'];

  const handleSelectOption = (value) => {
    handleOptionChange(value);
  };

  const handleAccountsClick = (evt) => {
    evt.preventDefault();
    dispatch(toggleAccountPopup(true));
  };

  const closeAccountsPopup = () => {
    dispatch(toggleAccountPopup(false));
  };

  return (
    <>
      {isAccountPopupOpen && <AccountPopup onClose={closeAccountsPopup} />}
      <div className="account-select__list">
        <p className="account-select__list-title">Все счета</p>
        {options.map((option) => (
          <Radio
            key={option}
            text={option}
            value={option}
            isChecked={selectedOption === option}
            onChange={() => handleSelectOption(option)}
          />
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
    </>
  );
}
