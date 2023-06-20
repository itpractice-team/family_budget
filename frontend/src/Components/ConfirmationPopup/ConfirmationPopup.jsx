import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { deleteUser, resetUser } from '../../store/slices/userSlice';
import { setLogin } from '../../store/slices/loginSlice';
import usePopup from '../../utils/hooks/usePopup';

export default function ConfirmationPopup({ onClose }) {
  const dispatch = useDispatch();
  const { closePopup: closeConfirmationPopup } = usePopup('confirmation');

  function handleCancel(evt) {
    evt.preventDefault();
    closeConfirmationPopup();
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
