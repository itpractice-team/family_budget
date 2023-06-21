import Button from '../../ui/Button/Button';
import usePopup from '../../utils/hooks/usePopup';

export default function СonfirmationPasswordChange() {
  const { openPopup: openLoginPopup } = usePopup('login');
  const { closePopup: closeInfoPopup } = usePopup('info');

  function handleLoginClick(evt) {
    evt.preventDefault();
    closeInfoPopup();
    openLoginPopup();
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
