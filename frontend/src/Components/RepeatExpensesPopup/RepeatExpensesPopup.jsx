import './RepeatExpensesPopup.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleRepeatExpensesPopup } from '../../store/slices/togglePopupSlice';
import DayBtn from './DayBtn/DayBtn';
import WeekBtn from './WeekBtn/WeekBtn';
import Categories from '../Categories/Categories';
import { arrCategoriesDate } from '../../utils/consts';

export default function RepeatExpensesPopup({ onClose }) {
  const [activeDate, setActiveDate] = useState('День');

  const dispatch = useDispatch();

  const handleDateClick = (tab) => {
    setActiveDate(tab);
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(toggleRepeatExpensesPopup(false));
  }

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(toggleRepeatExpensesPopup(false));
  }

  return (
    <Popup onClose={onClose} popupSize="popup_m" title="Повторяющиеся расходы">
      <form className="form" onSubmit={handleSubmit}>
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

        <h3 className="form__text-bold">Сделать повторяющуюся запись?</h3>
        <p className="form__input-label">Это событие будет повторяться каждый 1 день</p>
        <div className="repeat-expenses__tab">
          <Categories
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
