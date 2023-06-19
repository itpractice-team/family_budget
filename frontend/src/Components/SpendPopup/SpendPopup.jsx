import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleSpendPopup } from '../../store/slices/togglePopupSlice';

export default function SpendPopup({ onClose }) {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(toggleSpendPopup(false));
  }
  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Добавить расход">
      <form className="form form_add-operation" onSubmit={handleSubmit}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendPopup-date">
            Дата
            <input id="SpendPopup-date" name="created" className="form__input" type="date" />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendPopup-category">
            Категория расхода
            <input
              id="SpendPopup-category"
              name="category"
              className="form__input form__input_select"
              type="select"
              placeholder="Выберите категорию"
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpedPopup-name">
            Название
            <input
              id="SpendPopup-name"
              name="name"
              className="form__input"
              type="text"
              placeholder="Введите название"
            />
          </label>
        </div>

        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="SpendPopup-amount"
          >
            Сумма
            <input
              id="SpendPopup-amount"
              name="amount"
              className="form__input form__input_sum"
              type="number"
              placeholder="Введите сумму"
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendPopup-finance">
            Счёт списания
            <input
              id="SpendPopup-finance"
              name="finance"
              className="form__input form__input_select"
              type="select"
              placeholder="Выберите счёт"
            />
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
