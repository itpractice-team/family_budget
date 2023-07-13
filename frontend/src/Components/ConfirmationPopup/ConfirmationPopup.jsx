import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import CancelButton from '../CancelButton/CancelButton';

export default function ConfirmationPopup({ onClose, onSubmit, confirmationText, buttonText }) {
  const handleConfirmation = () => {
    onSubmit();
    onClose();
  };

  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Подтверждение удаления">
      <form className="form form_confirmation" onSubmit={handleConfirmation}>
        <p className="form__text_confirmation">{confirmationText}</p>
        <div className="form__button-wrapper">
          <CancelButton onClose={onClose} />
          <Button
            type="submit"
            variant="primary"
            content="text"
            text={`Удалить ${buttonText}`}
            size="medium"
          />
        </div>
      </form>
    </Popup>
  );
}
