import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EditMoneyboxPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import { editMoneybox, getMoneybox } from '../../store/slices/moneybox';

export default function EditMoneyboxPopup({ onClose, moneybox }) {
  const dispatch = useDispatch();

  const { amount, accumulated, description, name } = moneybox;

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
        id: moneybox.id,
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
      popupSize="popup_edit-moneybox"
      title={moneybox.name}
      subtitle="Конверт"
    >
      <p className="total">
        <span className="total-balance">{accumulated}</span> /
        <span className="total-target">{amount}</span>
      </p>

      <ProgressBar balance={accumulated} target={amount} />
      <form className="form" onSubmit={handleEditMoneybox}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="moneybox-name">
            Название конверта
            <input
              id="moneybox-name"
              className="form__input"
              type="text"
              name="name"
              placeholder="Введите название"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form__input-block">
          <label className="form__input-label form__input-label_divider" htmlFor="moneybox-amount">
            Итоговая сумма
            <input
              id="moneybox-amount"
              className="form__input form__input_sum"
              type="number"
              name="amount"
              placeholder="Введите сумму для накопления"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="moneybox-accumulated"
          >
            Пополнить конверт
            <input
              id="moneybox-accumulated"
              className="form__input form__input_sum"
              type="number"
              name="accumulated"
              placeholder="Введите сумму"
              value={formData.accumulated}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="SpendingPopup-amount"
          >
            Взять из конверта
            <input
              className="form__input form__input_sum"
              type="number"
              name="SpendingPopup-amount"
              id="SpendingPopup-amount"
              placeholder="Введите сумму"
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

        <label
          className="form__input-label form__input-label_textarea"
          htmlFor="moneybox-description"
        >
          Комментарий
          <textarea
            id="moneybox-description"
            className="form__input form__input_textarea"
            name="description"
            placeholder="Заметка о цели"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <div className="form__button-wrapper">
          <Button variant="fiat" content="text" text="Удалить конверт" size="medium" />
          <Button type="submit" variant="primary" content="text" text="Сохранить" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
