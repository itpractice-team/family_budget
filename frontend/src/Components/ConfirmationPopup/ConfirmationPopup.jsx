import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { deleteUser, resetUser } from '../../store/slices/userSlice';
import { toggleConfirmationPopup } from '../../store/slices/togglePopupSlice';
import { setLogin } from '../../store/slices/loginSlice';

export default function ConfirmationPopup({ onClose }) {
  const dispatch = useDispatch();

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(toggleConfirmationPopup(false));
  }

  const handleDeleteProfile = () => {
    dispatch(deleteUser());
    dispatch(resetUser());
    dispatch(setLogin(false));
  };

  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Подтверждение удаления">
      <form className="form form_confirmation" onSubmit={handleDeleteProfile}>
        <p className="form__text_confirmation">Вы действительно хотите удалить профиль?</p>
        <div className="form__button-wrapper">
          <Button
            variant="secondary"
            content="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          <Button
            type="submit"
            variant="primary"
            content="text"
            text="Удалить профиль"
            size="medium"
            onClick={handleDeleteProfile}
          />
        </div>
      </form>
    </Popup>
  );
}
