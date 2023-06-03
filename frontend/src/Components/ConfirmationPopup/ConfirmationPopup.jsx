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
    <Popup onClose={onClose} popupSize="popup_s">
      <form className="form form_single" onSubmit={handleDeleteProfile}>
        <h2 className="form__header">Подтверждение удаления</h2>
        <p className="form__text">Вы действительно хотите удалить профиль?</p>
        <div className="form__button-wrapper form__button-wrapper_profile">
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
