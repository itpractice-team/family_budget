import './ErrorNotification.scss';
import Button from '../../ui/Button/Button';
import usePopup from '../../utils/hooks/usePopup';

export default function ErrorNotification() {
  const { openPopup: openPasswordChangePopup } = usePopup('passwordChange');
  const { closePopup: closeInfoPopup } = usePopup('info');

  function handleRetryClick(evt) {
    evt.preventDefault();
    openPasswordChangePopup();
    closeInfoPopup();
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
