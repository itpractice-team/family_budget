import { Tooltip } from 'react-tooltip';
import { RegExEarnOperationName, RegExOperationAmount } from '../../utils/consts';
import Popup from '../Popup/Popup';

export default function EarningPopup({ onClose }) {
  function handleSubmit(e) {
    e.preventDefault();

    // call serialize & submit functions
  }

  return (
    <Popup onClose={onClose} popupSize="popup_l">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__header">Добавить доход</h2>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="EarningPopup-date">
            Дата
            <input
              type="date"
              name="EarningPopup-date"
              id="EarningPopup-date"
              className="form__input form__input_date"
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
          <label className="form__input-label" htmlFor="EarningPopup-category">
            Какая категория расхода?
            <select
              type="select"
              name="EarningPopup-category"
              id="EarningPopup-category"
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
          <label className="form__input-label" htmlFor="EarningPopup-name">
            Имя
            <input
              type="text"
              name="EarningPopup-name"
              id="EarningPopup-name"
              className="form__input form__input_text"
              placeholder="Название транзакции"
              minLength={2}
              maxLength={50}
              pattern={RegExEarnOperationName}
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
          <label className="form__input-label form__input-label_arr" htmlFor="EarningPopup-amount">
            Введите сумму
            <input
              type="number"
              name="EarningPopup-amount"
              id="EarningPopup-amount"
              className="form__input form__input_number"
              defaultValue="0"
              pattern={RegExOperationAmount}
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
          <label className="form__input-label" htmlFor="EarningPopup-card">
            Счёт зачисления
            <select
              type="select"
              name="EarningPopup-card"
              id="EarningPopup-card"
              className="form__input form__input_select"
            >
              {/* take card list & map */}
              <option value="" className="form__input_option">
                something
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

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="EarningPopup-card">
            Положить в конверт для накопления?
            <select
              type="select"
              name="EarningPopup-card"
              id="EarningPopup-card"
              className="form__input form__input_select"
            >
              {/* take card list & map */}
              <option value="not" className="form__input_option">
                He класть
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
          htmlFor="EarningPopup-comment"
        >
          Добавить комментарий
          <textarea
            name="EarningPopup-comment"
            id="EarningPopup-comment"
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
