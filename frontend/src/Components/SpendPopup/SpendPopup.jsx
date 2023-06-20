/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleSpendPopup } from '../../store/slices/togglePopupSlice';
import Select from '../Select/Select';
import Overlay from '../Overlay/Overlay';
import { addTransaction } from '../../store/slices/transactionList';
import SelectButton from '../../ui/SelectButton/SelectButton';

export default function SpendPopup({ onClose }) {
  const dispatch = useDispatch();

  const { finance, categories } = useSelector((state) => ({
    finance: state.userFinance.finance,
    categories: state.categories.categories,
  }));

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    category: false,
    finance: false,
  });

  const [formData, setFormData] = useState({
    created: '',
    category: categories?.[0]?.id || '',
    name: '',
    amount: '',
    finance: finance?.[0]?.id || '',
  });

  useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData((prevData) => ({ ...prevData, category: categories[0].id }));
    }
  }, [categories, formData.category]);

  useEffect(() => {
    if (finance.length > 0 && !formData.finance) {
      setFormData((prevData) => ({ ...prevData, finance: finance[0].id }));
    }
  }, [finance, formData.finance]);

  const handleOptionChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const toggleDropdown = (type) => {
    setIsDropdownOpen((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSpend = (evt) => {
    evt.preventDefault();
    dispatch(addTransaction({ ...formData, category_type: 1 })).then(() => {
      dispatch(toggleSpendPopup(false));
    });
  };

  function handleCancel(evt) {
    evt.preventDefault();
    dispatch(toggleSpendPopup(false));
  }

  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Добавить расход">
      <form className="form form_add-operation" onSubmit={handleAddSpend}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpendPopup-date">
            Дата
            <input
              id="SpendPopup-date"
              name="created"
              className="form__input"
              type="date"
              value={formData.created}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label">
            Категория расхода
            <SelectButton
              isOpen={isDropdownOpen.category}
              toggleList={() => toggleDropdown('category')}
              options={categories}
              selectedOption={formData.category}
              imageKey="image"
              nameKey="name"
              altText="Иконка категории"
            />
            <Overlay isOpen={isDropdownOpen.category} onClose={() => toggleDropdown('category')}>
              <Select
                handleOptionChange={(value) => handleOptionChange('category', value)}
                selectedOption={formData.category}
                options={categories}
              />
            </Overlay>
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="SpedPopup-name">
            Название
            <input
              id="SpendPopup-name"
              name="name"
              className="form__input"
              type="text"
              placeholder="Введите название"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__input-block">
          <label
            className="form__input-label form__input-label_divider"
            htmlFor="SpendPopup-amount"
          >
            Сумма
            <input
              id="SpendPopup-amount"
              name="amount"
              className="form__input form__input_sum"
              type="number"
              placeholder="Введите сумму"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label">
            Счёт списания
            <SelectButton
              isOpen={isDropdownOpen.finance}
              toggleList={() => toggleDropdown('finance')}
              options={finance}
              selectedOption={formData.finance}
              imageKey="image"
              nameKey="name"
              altText="Иконка банка"
            />
            <Overlay isOpen={isDropdownOpen.finance} onClose={() => toggleDropdown('finance')}>
              <Select
                handleOptionChange={(value) => handleOptionChange('finance', value)}
                selectedOption={formData.finance}
                options={finance}
              />
            </Overlay>
          </label>
        </div>

        <div className="form__button-wrapper form__button-wrapper_add-operation">
          <Button
            variant="secondary"
            content="text"
            text="Отменить"
            size="medium"
            onClick={handleCancel}
          />
          <Button type="submit" variant="primary" content="text" text="Готово" size="medium" />
        </div>
      </form>
    </Popup>
  );
}
