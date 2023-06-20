import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { addMoneybox } from '../../store/slices/moneybox';
import usePopup from '../../utils/hooks/usePopup';

export default function AddMoneyboxPopup({ onClose }) {
  const dispatch = useDispatch();

  const { closePopup: closeAddMoneyboxPopup } = usePopup('addMoneybox');

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    accumulated: 0,
    description: '',
  });

  const { name, amount, description } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleAddMoneybox = (evt) => {
    evt.preventDefault();
    dispatch(addMoneybox(formData)).then(() => {
      dispatch(closeAddMoneyboxPopup(false));
    });
  };

  const handleCancel = () => {
    closeAddMoneyboxPopup();
  };

  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Задайте свою цель для накопления">
      <form className="form" onSubmit={handleAddMoneybox}>
        <label className="form__input-label" htmlFor="Moneybox-name">
          Название конверта
          <input
            id="Moneybox-name"
            name="name"
            className="form__input"
            type="text"
            placeholder="Введите название"
            value={name}
            onChange={handleChange}
          />
        </label>
        <div className="form__input-block">
          <label className="form__input-label form__input-label_divider" htmlFor="Moneybox-amount">
            Итоговая сумма
            <input
              id="Moneybox-amount"
              name="amount"
              className="form__input form__input_sum"
              type="number"
              placeholder="Введите сумму для накопления"
              value={amount}
              onChange={handleChange}
            />
          </label>
        </div>
        <label className="form__input-label form__input-label_textarea" htmlFor="Moneybox-comment">
          Комментарий
          <textarea
            id="Moneybox-comment"
            name="description"
            className="form__input form__input_textarea"
            placeholder="Заметка о цели"
            value={description}
            onChange={handleChange}
          />
        </label>
        <div className="form__button-wrapper form__button-wrapper_add-operation">
          <Button
            variant="secondary"
            content="text"
            text="Отменить"
            size="medium"
            onClick={handleCancel}
          />
          <Button type="submit" variant="primary" content="text" text="Сохранить" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
