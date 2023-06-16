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
    <Button
      variant="secondary"
      content="text"
      text="Войти"
      size="medium"
      onClick={handleLoginClick}
    />
  );
}
