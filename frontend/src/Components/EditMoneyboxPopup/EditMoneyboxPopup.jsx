import './EditMoneyboxPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function EditMoneyboxPopup({ onClose, title }) {
  const balance = 20000;
  const target = 50000;

  return (
    <Popup onClose={onClose} popupSize="popup_edit-moneybox" title={title} subtitle="Конверт">
      <p className="total">
        <span className="total-balance">{balance}</span> /
        <span className="total-target">{target}</span>
      </p>

      <ProgressBar balance={balance} target={target} />
      <form className="form">
        <div className="form__input-block">
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
        </div>
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
        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="SpendingPopup-amount"
          >
            Пополнить конверт
            <input
              className="form__input form__input_sum"
              type="number"
              name="SpendingPopup-amount"
              id="SpendingPopup-amount"
              placeholder="Введите сумму"
            />
          </label>
        </div>
        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="SpendingPopup-amount"
          >
            Взять из конверта
            <input
              className="form__input form__input_sum"
              type="number"
              name="SpendingPopup-amount"
              id="SpendingPopup-amount"
              placeholder="Введите сумму"
            />
          </label>
        </div>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendingPopup-name">
            Название счёта
            <input
              className="form__input"
              type="text"
              name="SpendingPopup-name"
              id="SpendingPopup-name"
              placeholder="Выберите счёт"
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
        <div className="form__button-wrapper">
          <Button variant="fiat" type="text" text="Удалить конверт" size="medium" />
          <Button variant="primary" type="text" text="Сохранить" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
