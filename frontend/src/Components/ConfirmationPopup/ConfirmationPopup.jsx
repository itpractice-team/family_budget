import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { deleteUser, resetUser } from '../../store/slices/accountSlice';
import { setAuthentication } from '../../store/slices/authSlice';

export default function ConfirmationPopup({ onClose }) {
  const dispatch = useDispatch();

  function handleCancel(evt) {
    evt.preventDefault();
    onClose();
  }

  const handleDeleteProfile = () => {
    dispatch(deleteUser());
    dispatch(resetUser());
    dispatch(setAuthentication(false));
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
            onClick={handleCancel}
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
