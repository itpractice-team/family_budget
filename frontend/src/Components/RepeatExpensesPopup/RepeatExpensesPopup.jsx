import './RepeatExpensesPopup.scss';
import { useState } from 'react';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import DayBtn from './DayBtn/DayBtn';
import WeekBtn from './WeekBtn/WeekBtn';
import Tabs from '../Tabs/Tabs';
import { arrCategoriesDate } from '../../utils/consts';
import usePopup from '../../utils/hooks/usePopup';

export default function RepeatExpensesPopup({ onClose }) {
  const [activeDate, setActiveDate] = useState('День');

  const { closePopup: closeRepeatExpensesPopup } = usePopup('repeatExpenses');

  const handleDateClick = (tab) => {
    setActiveDate(tab);
  };

  function handleSubmit(e) {
    e.preventDefault();
    closeRepeatExpensesPopup();
  }

  function handleСancel(evt) {
    evt.preventDefault();
    closeRepeatExpensesPopup();
  }

  return (
    <Popup onClose={onClose} popupSize="popup_repeat" title="Повторяющиеся расходы">
      <form className="form repeat-expenses" onSubmit={handleSubmit}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RepeatExpenses-date">
            Дата
            <input
              className="form__input"
              type="date"
              name="RepeatExpenses-date"
              id="RepeatExpenses-date"
            />
          </label>
        </div>

        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="RepeatExpenses-amount"
          >
            Сумма
            <input
              className="form__input form__input_sum"
              type="number"
              name="RepeatExpenses-amount"
              id="RepeatExpenses-amount"
              placeholder="0"
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RepeatExpenses-category">
            Какая категория расхода?
            <select
              className="form__input form__input_select"
              type="select"
              name="RepeatExpenses-category"
              id="RepeatExpenses-category"
            >
              <option value="" className="form__input_option">
                Выбрать категорию
              </option>
            </select>
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RepeatExpenses-name">
            Описание
            <input
              className="form__input"
              type="text"
              name="RepeatExpenses-name"
              id="RepeatExpenses-name"
              placeholder="Название транзакции"
            />
          </label>
        </div>

        <div className="form__text-content">
          <p className="form__text-bold">Сделать повторяющуюся запись?</p>
          <p className="form__text">Это событие будет повторяться каждый 1 день</p>
        </div>

        <div className="repeat-expenses__tab">
          <Tabs
            arr={arrCategoriesDate}
            size="tab-size_l"
            activeInit={activeDate}
            onClick={handleDateClick}
          />
        </div>

        <div className="repeat-expenses__activeTab">
          {activeDate === 'День' && <DayBtn inputName="dayBtn" />}
          {activeDate === 'Неделя' && (
            <div className="repeat-expenses__container">
              <WeekBtn />
              <DayBtn ending="ую" period="неделю" inputName="weekBtn" />
            </div>
          )}
          {activeDate === 'Месяц' && <DayBtn period="месяц" inputName="monthBtn" />}
          {activeDate === 'Год' && <DayBtn period="год" inputName="yearBtn" />}
        </div>

        <div className="form__button-wrapper form__button-wrapper_add-operation">
          <Button
            variant="secondary"
            content="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          <Button type="submit" variant="primary" content="text" text="Сохранить" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
