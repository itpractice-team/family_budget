import Button from '../../ui/Button/Button';

export default function CancelButton({ onClose }) {
  const handleCancel = (evt) => {
    evt.preventDefault();
    onClose();
  };

  return (
    <Button
      variant="secondary"
      content="text"
      text="Отменить"
      size="medium"
      onClick={handleCancel}
    />
  );
}
