import './RepeatExpensesPopup.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleRepeatExpensesPopup } from '../../store/slices/togglePopupSlice';
import Tab from '../Tab/Tab';
import DayBtn from './DayBtn/DayBtn';
import WeekBtn from './WeekBtn/WeekBtn';
import MonthBtn from './MonthBtn/MonthBtn';
import YearBtn from './YearBtn/YearBtn';

export default function RepeatExpensesPopup({ onClose }) {
  const [activeTab, setActiveTab] = useState('День');
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
      <form className="form form_add-operation" onSubmit={handleSubmit}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RepeatExpenses-date">
            Дата
            <input
              className="form__input"
              type="text"
              name="RepeatExpenses-date"
              id="RepeatExpenses-date"
              placeholder="__.__.____"
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
          <Tab
            active={activeTab === 'День'}
            value="День"
            onClick={handleTabClick}
            size="tab-size_l"
          >
            День
          </Tab>
          <Tab
            active={activeTab === 'Неделя'}
            value="Неделя"
            size="tab-size_l"
            onClick={handleTabClick}
          >
            Неделя
          </Tab>
          <Tab
            active={activeTab === 'Месяц'}
            value="Месяц"
            size="tab-size_l"
            onClick={handleTabClick}
          >
            Месяц
          </Tab>
          <Tab active={activeTab === 'Год'} value="Год" size="tab-size_l" onClick={handleTabClick}>
            Год
          </Tab>
        </div>

        <div className="repeat-expenses__activeTab">
          {activeTab === 'День' && <DayBtn />}
          {activeTab === 'Неделя' && <WeekBtn />}
          {activeTab === 'Месяц' && <MonthBtn />}
          {activeTab === 'Год' && <YearBtn />}
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
