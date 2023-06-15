import { useDispatch } from 'react-redux';
import './СonfirmationPasswordChange.scss';
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
    <Button
      variant="fiat"
      content="text"
      text="Войти"
      size="medium"
      extraClass="button_confirm"
      onClick={handleLoginClick}
    />
  );
}
