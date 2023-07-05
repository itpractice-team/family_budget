import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import { editMoneybox, getMoneybox } from '../../store/slices/moneybox';

export default function EditRepeatSpendPopup({ onClose, repeatSpend }) {
  const dispatch = useDispatch();

  const { amount, accumulated, description, name } = repeatSpend;

  const userFinance = useSelector((state) => state.userFinanceAndCategories.userFinance);

  const [formData, setFormData] = useState({
    amount,
    accumulated,
    description,
    name,
  });
  const handleInputChange = (evt) => {
    const { name: fieldName, value } = evt.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleAccountChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      account: value,
    }));
  };

  const handleEditMoneybox = (evt) => {
    evt.preventDefault();
    dispatch(
      editMoneybox({
        id: repeatSpend.id,
        formData,
      }),
    ).then(() => {
      dispatch(getMoneybox());
      onClose();
    });
  };

  return (
    <Popup
      onClose={onClose}
      popupSize="popup_edit-repeat-spend"
      title={repeatSpend.name}
      subtitle="Повторение"
    >
      <p className="total">
        <span className="total-balance">{accumulated}</span> /
        <span className="total-target">{amount}</span>
      </p>
      <form className="form" onSubmit={handleEditMoneybox}>
        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="repeatSpend-amount"
          >
            Итоговая сумма
            <input
              id="repeatSpend-amount"
              className="form__input form__input_sum"
              type="number"
              name="amount"
              placeholder="Введите сумму повторения"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <SelectButtonWrapper
          label="Выберите счет"
          options={userFinance}
          initialValue={userFinance.length > 0 ? userFinance[0].id : ''}
          imageKey="image"
          nameKey="name"
          altText="Иконка счёта"
          handleOptionChange={handleAccountChange}
        />

        <div className="form__button-wrapper">
          <Button variant="fiat" content="text" text="Удалить повторение" size="medium" />
          <Button type="submit" variant="primary" content="text" text="Сохранить" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
