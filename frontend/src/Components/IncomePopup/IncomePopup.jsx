import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleIncomePopup } from '../../store/slices/togglePopupSlice';

export default function IncomePopup({ onClose }) {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(toggleIncomePopup(false));
  }

  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Добавить доход">
      <form className="form form_add-operation" onSubmit={handleSubmit}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="EarningPopup-date">
            Дата
            <input
              className="form__input"
              type="date"
              name="EarningPopup-date"
              id="EarningPopup-date"
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="EarningPopup-category">
            Категория дохода
            <select
              className="form__input form__input_select"
              type="select"
              name="EarningPopup-category"
              id="EarningPopup-category"
            >
              <option value="" className="form__input_option">
                Зарплата
              </option>
            </select>
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="EarningPopup-name">
            Название
            <input
              className="form__input"
              type="text"
              name="EarningPopup-name"
              id="EarningPopup-name"
              placeholder="Введите название транзакции"
            />
          </label>
        </div>

        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="EarningPopup-amount"
          >
            Сумма
            <input
              className="form__input form__input_sum"
              type="number"
              name="EarningPopup-amount"
              id="EarningPopup-amount"
              placeholder="Введите сумму"
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="EarningPopup-card">
            Счёт зачисления
            <select
              className="form__input form__input_select"
              type="select"
              name="EarningPopup-card"
              id="EarningPopup-card"
            >
              <option value="" className="form__input_option">
                Тинькофф
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
            onClick={handleСancel}
          />
          <Button type="submit" variant="primary" content="text" text="Готово" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
