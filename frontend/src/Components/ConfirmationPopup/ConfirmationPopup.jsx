/* eslint-disable jsx-a11y/control-has-associated-label */
import { useDispatch } from 'react-redux';
import './ConfirmationPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { deleteUser } from '../../store/slices/userSlice';
import { toggleConfirmationPopup } from '../../store/slices/togglePopupSlice';
// import { logoutUser } from '../../store/slices/loginSlice';

export default function ConfirmationPopup({ onClose }) {
  const dispatch = useDispatch();

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(toggleConfirmationPopup(false));
  }

  const handleDeleteProfile = () => {
    dispatch(deleteUser());
    // dispatch(logoutUser());
  };

  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Подтверждение удаления">
      <form className="form form_confirmation" onSubmit={handleDeleteProfile}>
        <p className="form__text_confirmation">Вы действительно хотите удалить профиль?</p>
        <div className="form__button-wrapper">
          <Button
            variant="secondary"
            type="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          <Button
            variant="primary"
            type="text"
            text="Удалить профиль"
            size="medium"
            onClick={handleDeleteProfile}
          />
        </div>
      </form>
    </Popup>
  );
}
