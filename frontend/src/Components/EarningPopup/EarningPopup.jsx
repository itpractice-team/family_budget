import { RegExEarnOperationName, RegExOperationAmount } from '../../utils/consts';

export default function EarningPopup() {
  return (
    <>
      <label className="form__input-label" htmlFor="EarningPopup-date">
        Дата
        <input
          type="date"
          name="EarningPopup-date"
          id="EarningPopup-date"
          className="form__input form__input_date"
        />
      </label>

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

        <label
          className="form__input-label form__input-label_radio"
          htmlFor="EarningPopup-norepite"
        >
          He повторять
          <input
            type="radio"
            name="isrepite"
            id="EarningPopup-norepite"
            className="form__radio"
            value="norepite"
          />
        </label>

        <label className="form__input-label form__input-label_radio" htmlFor="EarningPopup-repite">
          Повторять
          <input
            type="radio"
            name="isrepite"
            id="EarningPopup-repite"
            className="form__radio"
            value="repite"
          />
        </label>
      </fieldset>
    </>
  );
}
