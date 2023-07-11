import './RepeatExpensesPopup.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import Tabs from '../Tabs/Tabs';
import { arrCategoriesDate, arrCategoriesWeek } from '../../utils/consts';
import Radio from '../../ui/Radio/Radio';
import InputData from '../InputData/InputDate';
import { addRepeatSpendBox } from '../../store/slices/repeatSpendSlice';
import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import Checkbox from './checkbox';

export default function RepeatExpensesPopup({ onClose }) {
  const dispatch = useDispatch();

  const [activeDate, setActiveDate] = useState('Ежедневно');
  const [selected, setSelected] = useState('Указать дату окончания');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    category: '',
    created: '',

    // 0 Day, 1 Week, 2 Month, 3 Year
    repeat_type: 0,
    repeat_count: 1,

    // 0-Endlessy 1-Count 2-Date
    repeat_period: 0,
    to_date: '',
  });

  const {
    name,
    amount,
    category,
    // repeat_type, repeat_period
  } = formData;

  const { userCategories } = useSelector((state) => state.userFinanceAndCategories);
  const expenseCategories = userCategories.filter((cat) => cat.category_type === 1);

  const handleDateClick = (tab) => {
    setActiveDate(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addRepeatSpendBox({
        ...formData,
        // eslint-disable-next-line no-nested-ternary
        repeat_type: activeDate === 'Ежемесячно' ? 2 : activeDate === 'Еженедельно' ? 1 : 0,
        repeat_period: selected === 'Указать дату окончания' ? 2 : 0,
      }),
    ).then(() => {
      console.log('q', formData);
      onClose();
    });
  };

  const handleСancel = (evt) => {
    evt.preventDefault();
    onClose();
  };

  const handleRadio = ({ target }) => {
    const { value } = target;
    setSelected(value);
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleDateChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      created: value,
    }));
  };

  const handleToDateChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      to_date: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
  };

  return (
    <Popup onClose={onClose} popupSize="popup_repeat" title="Создать повторяющийся расход">
      <form className="form repeat-expenses" onSubmit={handleSubmit}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="repeat-expenses-name">
            Название
            <input
              className="form__input"
              type="text"
              name="name"
              id="repeat-expenses-name"
              placeholder="Название транзакции"
              value={name}
              onChange={handleChange}
            />
          </label>
        </div>

        <SelectButtonWrapper
          label="Категория"
          options={expenseCategories}
          value={category}
          name="category"
          imageKey="image"
          nameKey="name"
          altText="Иконка категории"
          handleOptionChange={handleCategoryChange}
        />

        <InputData
          labelTitle="Дата"
          inputStyleName="repeat-expenses-startDate"
          inputName="created"
          value={startDate}
          onChange={handleDateChange}
          setValueDate={setStartDate}
        />

        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="repeat-expenses-amount"
          >
            Сумма
            <input
              className="form__input form__input_sum"
              type="number"
              name="amount"
              id="repeat-expenses-amount"
              placeholder="0"
              value={amount}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__text-content">
          <p className="form__text-bold">Как часто повторять расход?</p>
        </div>

        <div className="repeat-expenses__tab">
          <Tabs
            arr={arrCategoriesDate}
            size="tab-size_l"
            activeInit={activeDate}
            onClick={handleDateClick}
          />
        </div>
        {activeDate === 'Еженедельно' && (
          <div className="repeat-expenses__tab">
            {arrCategoriesWeek.map((item) => {
              return (
                <li className="repeat-expenses__week-day" key={item.id}>
                  <Checkbox>{item.title}</Checkbox>
                </li>
              );
            })}
          </div>
        )}

        <div className="repeat-expenses__container">
          <p className="repeat-expenses__text-bold">Как долго повторять расход?</p>
          <Radio
            value="Бесконечно"
            isChecked={selected === 'Бесконечно'}
            onChange={handleRadio}
            text="Бесконечно"
          />
          <Radio
            value="Указать дату окончания"
            isChecked={selected === 'Указать дату окончания'}
            onChange={handleRadio}
            text="Указать дату окончания"
          />
          {selected === 'Указать дату окончания' && (
            <InputData
              labelTitle="Дата"
              inputStyleName="repeat-expenses-endDate"
              inputName="to_date"
              value={endDate}
              onChange={handleToDateChange}
              setValueDate={setEndDate}
            />
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
