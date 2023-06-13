import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';

export default function AddMoneyboxPopup({ onClose }) {
  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Задайте свою цель для накопления">
      <form className="form">
        <label className="form__input-label" htmlFor="SpendingPopup-name">
          Название конверта
          <input
            className="form__input"
            type="text"
            name="SpendingPopup-name"
            id="SpendingPopup-name"
            placeholder="Введите название"
          />
        </label>
        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="SpendingPopup-amount"
          >
            Итоговая сумма
            <input
              className="form__input form__input_sum"
              type="number"
              name="SpendingPopup-amount"
              id="SpendingPopup-amount"
              placeholder="Введите сумму для накопления"
            />
          </label>
        </div>
        <label
          className="form__input-label form__input-label_textarea"
          htmlFor="EarningPopup-comment"
        >
          Комментарий
          <textarea
            name="EarningPopup-comment"
            id="EarningPopup-comment"
            className="form__input form__input_textarea"
            placeholder="Заметка о цели"
          />
        </label>
      </form>

      <div className="form__button-wrapper form__button-wrapper_add-operation">
        <Button variant="secondary" type="text" text="Отменить" size="medium" />
        <Button variant="primary" type="text" text="Сохранить" size="medium" />
      </div>
    </Popup>
  );
}
