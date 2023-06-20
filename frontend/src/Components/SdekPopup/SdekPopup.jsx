import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleSdekPopup } from '../../store/slices/togglePopupSlice';

export default function SdekPopup({ onClose }) {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(toggleSdekPopup(false));
  }

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(toggleSdekPopup(false));
  }
  return (
    <Popup onClose={onClose} popupSize="popup_edit-operation" title="СДЭК">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form__input-label">Доставка</p>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendingPopup-date">
            Дата
            <input
              className="form__input"
              type="text"
              name="SpendingPopup-date"
              id="SpendingPopup-date"
              placeholder="__.__.____"
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
          <label className="form__input-label" htmlFor="SpendingPopup-name">
            Название
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
            Сумма
            <input
              className="form__input form__input_sum"
              type="number"
              name="SpendingPopup-amount"
              id="SpendingPopup-amount"
              placeholder="0"
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
            type="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          <Button variant="primary" type="text" text="Готово" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
