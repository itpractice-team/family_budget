import { useDispatch } from 'react-redux';
import './AddAccountPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleAddAccountPopup } from '../../store/slices/togglePopupSlice';

export default function AddAccountPopup({ onClose }) {
  const dispatch = useDispatch();

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(toggleAddAccountPopup(false));
  }

  return (
    <Popup onClose={onClose} popupSize="popup_m">
      <form className="form ">
        <h2 className="form__header">Мои счета</h2>
        <div className="form__button-wrapper form__button-wrapper_profile">
          <Button
            variant="secondary"
            type="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          <Button variant="primary" type="text" text="Сохранить" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
