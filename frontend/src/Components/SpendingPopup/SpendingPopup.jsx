import Popup from '../Popup/Popup';
import { RegExSpendOperationName, RegExOperationAmount } from '../../utils/consts';

export default function SpendingPopup({ isPopupOpen, closePopup }) {
  function handleSubmit(e) {
    e.preventDefault();

    // call serialize & submit functions
  }

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      formHeaderText="Ha что потратили?"
      handleSubmit={handleSubmit}
    >
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

        <label className="form__input-label form__input-label_radio" htmlFor="SpendingPopup-repite">
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
    </Popup>
  );
}
