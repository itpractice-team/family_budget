import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import usePopup from '../../utils/hooks/usePopup';

export default function TransferPopup({ onClose }) {
  const { closePopup: closeTransferPopup } = usePopup('transfer');

  const handleCancel = () => {
    closeTransferPopup();
  };
  return (
    <Popup onClose={onClose} popupSize="popup_transfer" title="Перевод между счетами">
      <form className="form">
        <label className="form__input-label" htmlFor="SpendingPopup-name">
          Счёт списания
          <input
            className="form__input"
            type="text"
            name="SpendingPopup-name"
            id="SpendingPopup-name"
            placeholder="Выберите счёт"
          />
        </label>

        <label className="form__input-label" htmlFor="SpendingPopup-name">
          Счёт зачисления
          <input
            className="form__input"
            type="text"
            name="SpendingPopup-name"
            id="SpendingPopup-name"
            placeholder="Выберите счёт"
          />
        </label>
        <label
          className="form__input-label form__input-label_divider"
          htmlFor="SpendingPopup-amount"
        >
          Сумма перевода
          <input
            className="form__input form__input_sum"
            type="number"
            name="SpendingPopup-amount"
            id="SpendingPopup-amount"
            placeholder="Введите сумму для перевода"
          />
        </label>
        <div className="form__button-wrapper">
          <Button
            variant="secondary"
            content="text"
            text="Отменить"
            size="medium"
            onClick={handleCancel}
          />
          <Button type="submit" variant="primary" content="text" text="Готово" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
