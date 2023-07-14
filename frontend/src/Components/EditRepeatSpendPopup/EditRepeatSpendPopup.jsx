import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import InputData from '../InputData/InputDate';
import {
  deleteRepeatSpendBox,
  editRepeatSpendBox,
  getRepeatSpendBox,
} from '../../store/slices/repeatSpendSlice';
import Tabs from '../Tabs/Tabs';
import { arrCategoriesDate, arrCategoriesWeek } from '../../utils/consts';
import Checkbox from '../RepeatExpensesPopup/checkbox';
import Radio from '../../ui/Radio/Radio';
import usePopup from '../../utils/hooks/usePopup';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';
import toISOString from '../../utils/helpers';

export default function EditRepeatSpendPopup({ onClose, repeatSpend }) {
  const dispatch = useDispatch();

  const { id } = repeatSpend;
  const dateInputDisabled = repeatSpend.created.slice(0, 10).split('-').reverse().join('.');

  // выбираем только расходные
  const { userCategories } = useSelector((state) => state.userFinanceAndCategories);
  const expenseCategories = userCategories.filter((cat) => cat.category_type === 1);

  const [arrActiveDay, setArrActiveDay] = useState([]);
  const [activeType, setActiveType] = useState('Ежедневно');
  const [selected, setSelected] = useState('Бесконечно');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [formData, setFormData] = useState(repeatSpend);

  useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-nested-ternary
    const type = activeType === 'Ежедневно' ? 0 : activeType === 'Еженедельно' ? 1 : 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const period = selected === 'Указать дату окончания' ? 2 : 0;

    if (type === 1) {
      setFormData({
        ...formData,
        repeat_type: type,
        repeat_period: period,
        type_week: arrActiveDay,
      });
    } else {
      setFormData({ ...formData, repeat_type: type, repeat_period: period });
    }
  }, [activeType, selected, arrActiveDay]);

  const {
    isOpen: isConfirmationPopupOpen,
    openPopup: openConfirmationPopup,
    closePopup: closeConfirmationPopup,
  } = usePopup('confirmation');

  const handleRepeatSpendBox = (evt) => {
    evt.preventDefault();
    dispatch(
      editRepeatSpendBox({
        id: repeatSpend.id,
        formData,
      }),
    ).then(() => {
      dispatch(getRepeatSpendBox());
      onClose();
    });
  };
  const handleDeleteRepeatSpendBox = (evt) => {
    evt.preventDefault();
    openConfirmationPopup();
  };

  const handleChangeDay = (e) => {
    const { checked } = e.target;
    const checkedName = e.target.name;
    if (checked === true) {
      setArrActiveDay((prev) => [...prev, checkedName]);
    } else {
      setArrActiveDay(arrActiveDay?.filter((i) => i !== checkedName));
    }
  };

  const handleDateClick = (tab) => {
    setActiveType(tab);
  };

  const handleRadio = (evt) => {
    setSelected(evt.target.value);
  };

  const handleToDateChange = (value) => {
    const date = Date(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      to_date: toISOString(date),
    }));
  };

  return (
    <Popup onClose={onClose} popupSize="popup_repeat" title={repeatSpend.name}>
      <form className="form repeat-expenses" onSubmit={handleRepeatSpendBox}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="repeat-expenses-name">
            Название
            <input
              className="form__input"
              type="text"
              name="name"
              id="repeat-expenses-name"
              placeholder="Название транзакции"
              value={formData.name}
              onChange={(evt) => {
                setFormData({ ...formData, [evt.target.name]: evt.target.value });
              }}
            />
          </label>
        </div>

        <SelectButtonWrapper
          label="Категория"
          options={expenseCategories}
          initialValue={formData?.category?.id || ''}
          imageKey="image"
          nameKey="name"
          altText="Иконка категории"
          handleOptionChange={(value) =>
            setFormData({
              ...formData,
              category: value,
            })
          }
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
              value={formData.amount}
              onChange={(evt) => setFormData({ ...formData, [evt.target.name]: +evt.target.value })}
            />
          </label>
        </div>

        <InputData
          labelTitle="Дата"
          inputStyleName="repeat-expenses-startDate"
          inputName="created"
          value={dateInputDisabled}
          disabled={true}
        />

        <div className="form__text-content">
          <p className="form__text-bold">Как часто повторять расход?</p>
        </div>

        <div className="repeat-expenses__tab">
          <Tabs
            arr={arrCategoriesDate}
            size="tab-size_l"
            activeInit={activeType}
            onClick={handleDateClick}
          />
        </div>
        {activeType === 'Еженедельно' && (
          <div className="repeat-expenses__tab">
            {arrCategoriesWeek.map((item) => {
              return (
                <li className="repeat-expenses__week-day" key={item.id}>
                  <Checkbox name={item.title} handleChangeDay={handleChangeDay}>
                    {item.title}
                  </Checkbox>
                </li>
              );
            })}
          </div>
        )}
        {activeType === 'Ежемесячно' && (
          <CustomDatePicker
            type="date"
            onChange={(date) => {
              setStartDate(date);
            }}
            startDate={startDate}
            dateFormat="dd"
          />
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
            text="Удалить повторяющийся расход"
            size="medium"
            onClick={handleDeleteRepeatSpendBox}
          />
          <Button type="submit" variant="primary" content="text" text="Сохранить" size="medium" />
        </div>
      </form>
      {isConfirmationPopupOpen && (
        <ConfirmationPopup
          onClose={closeConfirmationPopup}
          onSubmit={() => {
            dispatch(deleteRepeatSpendBox(id)).then(() => {
              dispatch(getRepeatSpendBox());
              onClose();
            });
          }}
          confirmationText={`Вы действительно хотите удалить повторный расход «${repeatSpend.name}» ?`}
          buttonText={repeatSpend.name}
        />
      )}
    </Popup>
  );
}
