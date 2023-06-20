import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import usePopup from '../../utils/hooks/usePopup';

export default function EditTransactionPopup({ onClose, transaction }) {
  const { closePopup: closeEditTransactionPopup } = usePopup('editTransaction');

  if (!transaction) {
    return null;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  const handleCancel = () => {
    closeEditTransactionPopup();
  };

  return (
    <Popup onClose={onClose} popupSize="popup_edit-operation" title={transaction.name}>
      <form className="form" onSubmit={handleSubmit}>
        <p className="form__input-label">{transaction.category.name}</p>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="EditTransactionPopup-date">
            Дата
            <input
              id="EditTransactionPopup-date"
              name="created"
              className="form__input form__input_date"
              type="text"
              placeholder="Введите дату"
              defaultValue={new Date(transaction.created).toLocaleDateString('ru-RU')}
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendingPopup-category">
            Категория расхода
            <select
              className="form__input form__input_select"
              type="select"
              name="SpendingPopup-category"
              id="SpendingPopup-category"
            >
              <option value="" className="form__input_option">
                Выбрать категорию
              </option>
            </select>
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="EditTransactionPopup-name">
            Название
            <input
              id="EditTransactionPopup-name"
              name="name"
              className="form__input"
              type="text"
              placeholder="Введите название"
              defaultValue={transaction.name}
            />
          </label>
        </div>

        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="EditTransactionPopup-amount"
          >
            Сумма
            <input
              id="EditTransactionPopup-amount"
              name="amount"
              className="form__input form__input_sum"
              type="number"
              placeholder="Введите сумму"
              defaultValue={transaction.amount}
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendingPopup-card">
            Счёт списания
            <select
              className="form__input form__input_select"
              type="select"
              name="SpendingPopup-card"
              id="SpendingPopup-card"
            >
              <option value="" className="form__input_option">
                Внести счёт
              </option>
            </select>
          </label>
        </div>

        <div className="form__button-wrapper form__button-wrapper_add-operation">
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
