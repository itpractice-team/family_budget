import { useDispatch, useSelector } from 'react-redux';
import './AccountsPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleAccountsPopup, toggleAddAccountPopup } from '../../store/slices/togglePopupSlice';
import AddAccountPopup from '../AddAccountPopup/AddAccountPopup';

export default function AccountsPopup({ onClose }) {
  const dispatch = useDispatch();

  const isAddAccountPopupOpen = useSelector((state) => state.popup.isAddAccountPopupOpen);

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(toggleAccountsPopup(false));
  }

  const closeAddAccountPopup = () => {
    dispatch(toggleAddAccountPopup(false));
  };

  const handleAddAccountClick = (evt) => {
    evt.preventDefault();
    dispatch(toggleAddAccountPopup(true));
  };

  return (
    <Popup onClose={onClose} popupSize="popup_s">
      <form className="form ">
        <h2 className="form__header">Мои счета</h2>
        <Button
          variant="secondary"
          type="icon-text"
          text="Добавить счет"
          size="medium"
          onClick={handleAddAccountClick}
        />
        <div className="form__button-wrapper form__button-wrapper_profile">
          <Button
            variant="secondary"
            type="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          <Button variant="primary" type="text" text="Готово" size="medium" />
        </div>
        {isAddAccountPopupOpen && <AddAccountPopup onClose={closeAddAccountPopup} />}
      </form>
    </Popup>
  );
}
