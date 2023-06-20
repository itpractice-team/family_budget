import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { toggleSpendPopup } from '../../store/slices/togglePopupSlice';
import { getFinanceList } from '../../store/slices/finance';
import Select from '../Select/Select';
import Overlay from '../Overlay/Overlay';
import { addSpend } from '../../store/slices/transactionList';

export default function SpendPopup({ onClose }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFinanceList());
  }, []);

  const { finance, categories } = useSelector((state) => ({
    finance: state.userFinance.finance,
    categories: state.categories.categories,
  }));
  const [isFinanceListOpen, setIsFinanceListOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [formData, setFormData] = useState({
    created: '',
    category: categories?.[0]?.id || '',
    name: '',
    amount: '',
    finance: finance?.[0]?.id || '',
  });

  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prevData) => ({ ...prevData, category: categories[0].id }));
    }
  }, [categories]);

  useEffect(() => {
    if (finance.length > 0) {
      setFormData((prevData) => ({ ...prevData, finance: finance[0].id }));
    }
  }, [finance]);

  const handleOptionChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const toggleList = (type) => {
    if (type === 'finance') {
      setIsFinanceListOpen(!isFinanceListOpen);
    } else if (type === 'category') {
      setIsCategoryListOpen(!isCategoryListOpen);
    }
  };

  const closeList = (type) => {
    if (type === 'finance') {
      setIsFinanceListOpen(false);
    } else if (type === 'category') {
      setIsCategoryListOpen(false);
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSpend = (evt) => {
    evt.preventDefault();
    dispatch(addSpend(formData)).then(() => {
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
          <label className="form__input-label" htmlFor="SpendPopup-category">
            Категория расхода
            <button
              className={`form__input form__input_select ${
                isCategoryListOpen ? 'form__input_select--open' : ''
              }`}
              type="button"
              onClick={() => toggleList('category')}
            >
              {formData.category && (
                <>
                  <img
                    src={categories.find((category) => category.id === formData.category)?.image}
                    className="form__input_select__icon"
                    alt="Иконка категории"
                  />
                  {categories.find((category) => category.id === formData.category)?.name}
                </>
              )}
              <span className="form__input_select__arrow" />
            </button>
            <Overlay isOpen={isCategoryListOpen} onClose={() => closeList('category')}>
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
          <label className="form__input-label" htmlFor="SpendPopup-finance">
            Счёт списания
            <button
              className={`form__input form__input_select ${
                isFinanceListOpen ? 'form__input_select--open' : ''
              }`}
              type="button"
              onClick={() => toggleList('finance')}
            >
              {formData.finance && (
                <>
                  <img
                    src={finance?.find((account) => account.id === formData.finance)?.image}
                    className="form__input_select__icon"
                    alt="Иконка банка"
                  />
                  {finance?.find((account) => account.id === formData.finance)?.name}
                </>
              )}
              <span className="form__input_select__arrow" />
            </button>
            <Overlay isOpen={isFinanceListOpen} onClose={() => closeList('finance')}>
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
