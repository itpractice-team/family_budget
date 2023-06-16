import { useDispatch } from 'react-redux';
import './ErrorNotification.scss';
import Button from '../../ui/Button/Button';
import { toggleInfoPopup, togglePasswordChangePopup } from '../../store/slices/togglePopupSlice';

export default function ErrorNotification() {
  const dispatch = useDispatch();

  function handleRetryClick(evt) {
    evt.preventDefault();
    dispatch(togglePasswordChangePopup(true));
    dispatch(toggleInfoPopup(false));
  }
  return (
    <Button
      variant="primary"
      content="text"
      text="Повторить"
      size="medium"
      onClick={handleRetryClick}
    />
  );
}
