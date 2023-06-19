import './RepeatExpensesPopup.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleRepeatExpensesPopup } from '../../store/slices/togglePopupSlice';
import DayBtn from './DayBtn/DayBtn';
import WeekBtn from './WeekBtn/WeekBtn';
import Tabs from '../Tabs/Tabs';
import { arrCategoriesDate } from '../../utils/consts';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';
import Radio from '../../ui/Radio/Radio';

export default function RepeatExpensesPopup({ onClose }) {
  const [activeDate, setActiveDate] = useState('День');
  const [selected, setSelected] = useState('До');
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [valueDate, setValueDate] = useState('');

  const dispatch = useDispatch();

  const handleDateClick = (tab) => {
    setActiveDate(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(toggleRepeatExpensesPopup(false));
    setValueDate('');
  };

  const handleСancel = (evt) => {
    evt.preventDefault();
    dispatch(toggleRepeatExpensesPopup(false));
  };

  const handleRadio = ({ target }) => {
    const { value } = target;
    setSelected(value);
  };

  const isOpen = () => {
    setValueDate(startDate.toLocaleDateString());
    setOpen(true);
  };

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
          {activeDate === 'День' && <DayBtn activeDate={activeDate} inputName="dayBtn" />}
          {activeDate === 'Неделя' && (
            <div className="repeat-expenses__container">
              <WeekBtn />
              <DayBtn activeDate={activeDate} inputName="weekBtn" />
            </div>
          )}
          {activeDate === 'Месяц' && <DayBtn activeDate={activeDate} inputName="monthBtn" />}
          {activeDate === 'Год' && <DayBtn activeDate={activeDate} inputName="yearBtn" />}
        </div>

        <div className="repeat-expenses__container">
          <p className="repeat-expenses__text-bold">Длительность</p>
          <Radio
            value="Бесконечно"
            isChecked={selected === 'Бесконечно'}
            onChange={handleRadio}
            text="Бесконечно"
          />
          <Radio
            value="Заданное кол-во раз"
            isChecked={selected === 'Заданное кол-во раз'}
            onChange={handleRadio}
            text="Заданное количество раз"
          />
          <Radio value="До" isChecked={selected === 'До'} onChange={handleRadio} text="До" />
          {selected === 'До' && (
            <>
              <div className="form__input-block">
                <label className="form__input-label" htmlFor="RepeatExpensesPopup-date">
                  Дата
                  <input
                    className="form__input"
                    type="text"
                    name="RepeatExpensesPopup-date"
                    id="RepeatExpensesPopup-date"
                    value={valueDate}
                    onChange={(e) => setValueDate(e.target.value)}
                    placeholder="дд.мм.гггг"
                    onClick={isOpen}
                  />
                </label>
              </div>
              {open && (
                <CustomDatePicker
                  type="date"
                  onChange={(date) => {
                    setStartDate(date);
                    setValueDate(date.toLocaleDateString());
                    setOpen(false);
                  }}
                  startDate={startDate}
                />
              )}
            </>
          )}
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
