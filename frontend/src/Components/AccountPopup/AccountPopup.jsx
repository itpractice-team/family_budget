import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './AccountPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleAccountPopup } from '../../store/slices/togglePopupSlice';
import accounts from '../../Images/accountslist.svg';

export default function AccountPopup({ onClose }) {
  const dispatch = useDispatch();
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [popupSize, setPopupSize] = useState('popup_s');

  function handleCancel(evt) {
    evt.preventDefault();
    dispatch(toggleAccountPopup(false));
  }

  function handleCancelForm(evt) {
    evt.preventDefault();
    setIsAddingAccount(false);
    setPopupSize('popup_s');
  }

  const handleAddAccountClick = (evt) => {
    evt.preventDefault();
    setIsAddingAccount(true);
    setPopupSize('popup_m');
  };

  return (
    <Popup onClose={onClose} popupSize={popupSize} title="Мои счета">
      <section className='account-popup__content'>
      <div className="account-popup__list">
        <img src={accounts} alt="" />
        </div>
        {!isAddingAccount ? (
          <Button
            variant="secondary"
            type="icon-text"
            text="Добавить счет"
            size="medium"
            extraClass='button__add-account'
            onClick={handleAddAccountClick}
          />
        ) : (
          <form className="form">
            <label className="form__input-label" htmlFor="SpendingPopup-card">
              Название счёта
              <select
                type="select"
                name="SpendingPopup-card"
                id="SpendingPopup-card"
                className="form__input form__input_select"
              >
                <option value="" className="form__input_option">
                  Карта Тинькофф
                </option>
              </select>
            </label>

            <label
              className="form__input-label form__input-label_arr"
              htmlFor="SpendingPopup-amount"
            >
              Текущий баланс
              <input
                type="number"
                name="SpendingPopup-amount"
                id="SpendingPopup-amount"
                className="form__input form__input_number"
              />
            </label>

            <div className="form__button-wrapper">
              <Button
                variant="secondary"
                type="text"
                text="Отменить"
                size="medium"
                onClick={handleCancelForm}
              />
              <Button variant="primary" type="text" text="Сохранить" size="medium" />
            </div>
          </form>
        )}

        <div className="form__button-wrapper form__button-wrapper_account">
          {!isAddingAccount && (
            <>
              <Button
                variant="secondary"
                type="text"
                text="Отменить"
                size="medium"
                onClick={handleCancel}
              />
              <Button variant="primary" type="text" text="Готово" size="medium" />
            </>
          )}
        </div>
      
      </section>
    </Popup>
  );
}
