import { Tooltip } from 'react-tooltip';
import { RegExSpendOperationName, RegExOperationAmount } from '../../utils/consts';
import Popup from '../Popup/Popup';

export default function SpendingPopup({ onClose }) {
  function handleSubmit(e) {
    e.preventDefault();

    // call serialize & submit functions
  }

  return (
    <Popup onClose={onClose} popupSize="popup_l">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__header">На что потратили?</h2>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendingPopup-date">
            Дата
            <input
              type="date"
              name="SpendingPopup-date"
              id="SpendingPopup-date"
              className="form__input form__input_date"
              maxLength="8"
            />
          </label>

          <div
            className="form__tooltip"
            data-tooltip-id="date"
            data-tooltip-content="ВСТАВИТЬ ТРЕБОВАНИЯ ВАЛИДАЦИИ"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="date"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendingPopup-category">
            Какая категория расхода?
            <select
              type="select"
              name="SpendingPopup-category"
              id="SpendingPopup-category"
              className="form__input form__input_select"
            >
              {/* take categories list & map */}
              <option value="" className="form__input_option">
                something
              </option>
            </select>
          </label>

          <div
            className="form__tooltip"
            data-tooltip-id="category"
            data-tooltip-content="ВСТАВИТЬ ТРЕБОВАНИЯ ВАЛИДАЦИИ"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="category"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendingPopup-name">
            Имя
            <input
              type="text"
              name="SpendingPopup-name"
              id="SpendingPopup-name"
              className="form__input form__input_text"
              placeholder="Название транзакции"
              minLength={2}
              maxLength={15}
              pattern={RegExSpendOperationName}
            />
          </label>

          <div
            className="form__tooltip"
            data-tooltip-id="name"
            data-tooltip-content="ВСТАВИТЬ ТРЕБОВАНИЯ ВАЛИДАЦИИ"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="name"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label form__input-label_arr" htmlFor="SpendingPopup-amount">
            Введите сумму
            <input
              type="number"
              name="SpendingPopup-amount"
              id="SpendingPopup-amount"
              className="form__input form__input_number"
              defaultValue="0"
              minLength={1}
              maxLength={15}
              pattern={RegExOperationAmount}
            />
          </label>

          <div
            className="form__tooltip"
            data-tooltip-id="amount"
            data-tooltip-content="ВСТАВИТЬ ТРЕБОВАНИЯ ВАЛИДАЦИИ"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="amount"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendingPopup-card">
            Счёт списания
            <select
              type="select"
              name="SpendingPopup-card"
              id="SpendingPopup-card"
              className="form__input form__input_select"
            >
              {/* take card list & map */}
              <option value="" className="form__input_option">
                Карта Тинькофф
              </option>
            </select>
          </label>

          <div
            className="form__tooltip"
            data-tooltip-id="date"
            data-tooltip-content="ВСТАВИТЬ ТРЕБОВАНИЯ ВАЛИДАЦИИ"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="date"
            place="bottom"
          />
        </div>

        <label
          className="form__input-label form__input-label_textarea"
          htmlFor="SpendingPopup-comment"
        >
          Добавить комментарий
          <textarea
            name="SpendingPopup-comment"
            id="SpendingPopup-comment"
            className="form__input form__input_textarea"
            placeholder="Место или заметка o событии"
            minLength={2}
            maxLength={100}
          />
        </label>

        <fieldset className="form__radiogroup" name="isrepite">
          <legend className="form__text">Сделать повторяющуюся запись?</legend>

          <p className="form__text_label">Это событие не повторяется</p>

          <label
            className="form__input-label form__input-label_radio"
            htmlFor="SpendingPopup-norepite"
          >
            He повторять
            <input
              type="radio"
              name="isrepite"
              id="SpendingPopup-norepite"
              className="form__radio"
              value="norepite"
            />
          </label>

          <label
            className="form__input-label form__input-label_radio"
            htmlFor="SpendingPopup-repite"
          >
            Повторять
            <input
              type="radio"
              name="isrepite"
              id="SpendingPopup-repite"
              className="form__radio"
              value="repite"
            />
          </label>
        </fieldset>

        <div className="form__button-wrapper">
          <button type="reset" className="form__button form__button_reset">
            Отменить
          </button>

          <button type="submit" className="form__button form__button_submit">
            Готово
          </button>
        </div>
      </form>
    </Popup>
  );
}
