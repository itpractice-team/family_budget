import { useDispatch } from 'react-redux';
import Button from '../../ui/Button/Button';
import { toggleInfoPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';

export default function СonfirmationPasswordChange() {
  const dispatch = useDispatch();

  function handleLoginClick(evt) {
    evt.preventDefault();
    dispatch(toggleLoginPopup(true));
    dispatch(toggleInfoPopup(false));
  }
  return (
    <div className="form form_single">
      <h2 className="form__header">Пароль успешно изменен</h2>
      <Button variant="fiat" type="text" text="Войти" size="medium" onClick={handleLoginClick} />
    </div>
  );
}
