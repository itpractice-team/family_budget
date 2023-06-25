/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AddItemPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import Radio from '../../ui/Radio/Radio';
import CancelButton from '../CancelButton/CancelButton';
import plus from '../../Images/icons/plus.svg';
import useDropdown from '../../utils/hooks/useDropdown';
import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import {
  getUserFinance,
  getUserCategories,
  addFinance,
  deleteFinance,
  addCategory,
  deleteCategory,
} from '../../store/slices/userFinanceAndCategoriesSlice';
import { getFinanceOptions, getCategoryOptions } from '../../store/slices/itemOptions';

export default function AddItemPopup({ onClose, itemType }) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [popupSize, setPopupSize] = useState('popup_s');
  const [showAllIcons, setShowAllIcons] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleToggleIcons = (evt) => {
    evt.preventDefault();
    setShowAllIcons((prevShowAllIcons) => !prevShowAllIcons);
  };

  const dispatch = useDispatch();

  const { userFinance, userCategories } = useSelector((state) => state.userFinanceAndCategories);
  const { finance: financeOptions, categoryIcons: categoryOptions } = useSelector(
    (state) => state.itemOptions,
  );

  const itemList = itemType === 'finance' ? userFinance : userCategories;
  const itemDropdown = useDropdown(itemList);

  const [formData, setFormData] = useState({
    item: '',
    categoryName: '',
    categoryIcon: '',
    categoryType: 'spend',
    balance: '',
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      item: itemDropdown.selectedOption,
    }));
  }, [itemDropdown.selectedOption]);

  useEffect(() => {
    if (itemList.length > 0 && !formData.item) {
      setFormData((prevData) => ({
        ...prevData,
        item: itemList[0].id,
      }));
    }
  }, [itemList, formData.item]);

  const handleChange = (data) => {
    const { name, value } = data;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'item') {
      setSelectedOptionId(value);
    }
  };

  useEffect(() => {
    if (
      itemList.length > 0 &&
      (!formData.item || !itemList.find((item) => item.id === formData.item))
    ) {
      setFormData((prevData) => ({
        ...prevData,
        item: itemList[0].id,
      }));
    }
  }, [itemList, formData.item]);

  useEffect(() => {
    dispatch(getUserFinance());
    dispatch(getUserCategories());
    dispatch(getFinanceOptions());
    dispatch(getCategoryOptions());
  }, [dispatch]);

  function handleCancelForm(evt) {
    evt.preventDefault();
    setIsAddingItem(false);
    setPopupSize('popup_s');
  }

  const handleAddItemClick = (evt) => {
    evt.preventDefault();
    setIsAddingItem(true);
    setPopupSize('popup_add');
  };

  let popupTitle;
  if (itemType === 'finance') {
    popupTitle = 'Мои счета';
  } else if (itemType === 'categories') {
    popupTitle = 'Мои категории';
  }

  let options;
  if (itemType === 'finance') {
    options = financeOptions;
  } else if (itemType === 'categories') {
    options = categoryOptions;
  }

  const handleCategoryNameChange = (evt) => {
    evt.preventDefault();
    const { value } = evt.target;
    setFormData((prevData) => ({
      ...prevData,
      categoryName: value,
    }));
  };

  const handleCategoryIconChange = (evt, icon) => {
    evt.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      categoryIcon: icon,
    }));
  };

  const handleDeleteItemClick = (id, type) => {
    if (type === 'categories') {
      dispatch(deleteCategory(id)).then(() => {
        dispatch(getUserCategories());
      });
    } else if (type === 'finance') {
      dispatch(deleteFinance(id)).then(() => {
        dispatch(getUserFinance());
      });
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (itemType === 'finance') {
      const selectedFinance = options.find((finance) => finance.id === selectedOptionId);
      const financeData = {
        id: selectedFinance.id,
        balance: parseFloat(formData.balance),
      };
      dispatch(addFinance(financeData)).then(() => {
        setIsAddingItem(false);
        setPopupSize('popup_s');
        onClose();
      });
    } else if (itemType === 'categories') {
      const categoryData = {
        name: formData.categoryName,
        icon: formData.categoryIcon,
        category_type: formData.categoryType === 'spend' ? 1 : 2,
      };
      dispatch(addCategory(categoryData)).then(() => {
        setIsAddingItem(false);
        setPopupSize('popup_s');
        onClose();
      });
    }
  };

  return (
    <Popup onClose={onClose} popupSize={popupSize} title={popupTitle}>
      <section
        className={`add-item-popup__content_${
          popupSize === 'popup_s' ? 'one-column' : 'two-columns'
        }`}
      >
        <div className="add-item-popup__list">
          {itemList.map((item) => (
            <article key={item.id} className="add-item-popup__list-item">
              <div className="add-item-popup__list-item-info">
                <img src={item.image} alt={item.name} className="add-item-popup__list-item-image" />
                <p className="add-item-popup__list-item-name">{item.name}</p>
              </div>
              <button
                className="add-item-popup__list-item-button-delete"
                aria-label="Удалить"
                onClick={() => handleDeleteItemClick(item.id, itemType)}
              />
            </article>
          ))}
        </div>

        {!isAddingItem ? (
          <Button
            variant="secondary"
            content="icon-text"
            image={plus}
            text={`Добавить ${itemType === 'finance' ? 'счет' : 'категорию'}`}
            size="medium"
            extraClass="add-item-popup__button-add"
            onClick={handleAddItemClick}
          />
        ) : (
          <form className="add-item-popup__form" onSubmit={handleSubmit}>
            {itemType === 'finance' ? (
              <>
                <SelectButtonWrapper
                  label="Счет"
                  options={options}
                  initialValue={formData.item}
                  imageKey="image"
                  nameKey="name"
                  altText="Иконка"
                  handleOptionChange={(value) => handleChange({ name: 'item', value })}
                />
                <label
                  className="add-item-popup__form-input-label add-item-popup__form-input-label_divider"
                  htmlFor="SpendingPopup-amount"
                >
                  Текущий баланс
                  <input
                    type="number"
                    name="SpendingPopup-amount"
                    id="SpendingPopup-amount"
                    className="add-item-popup__form-input form__input_sum"
                    value={formData.balance}
                    onChange={(evt) => handleChange({ name: 'balance', value: evt.target.value })}
                  />
                </label>
              </>
            ) : (
              <>
                <div className="add-item-popup__form-input-block">
                  <label className="add-item-popup__form-input-label" htmlFor="categoryName">
                    Название категории
                    <input
                      id="categoryName"
                      name="categoryName"
                      className="add-item-popup__form-input"
                      type="text"
                      placeholder="Введите название"
                      value={formData.categoryName}
                      onChange={handleCategoryNameChange}
                    />
                  </label>
                </div>

                <div className="add-item-popup__form-input-block">
                  <label className="add-item-popup__form-input-label" htmlFor="selectIcon">
                    Выберите иконку
                    <div className="add-item-popup__icon-list">
                      {categoryOptions
                        .slice(0, showAllIcons ? categoryOptions.length : 7)
                        .map((option) => (
                          <button
                            key={option.id}
                            className={`add-item-popup__icon-button ${
                              option.id === formData.categoryIcon ? 'selected' : ''
                            }`}
                            onClick={(evt) => handleCategoryIconChange(evt, option.id)}
                          >
                            <img src={option.image} alt="Иконка категории" />
                          </button>
                        ))}
                    </div>
                    <button
                      className={`add-item-popup__toggle-icons-button ${
                        showAllIcons ? 'add-item-popup__toggle-icons-button--open' : ''
                      }`}
                      onClick={handleToggleIcons}
                    >
                      Показать все
                    </button>
                  </label>
                </div>

                <div className="add-item-popup__form-input-block">
                  <label className="add-item-popup__form-input-label">
                    Где показывать?
                    <div className="add-item-popup__radio-buttons">
                      <Radio
                        text="В расходе"
                        value="spend"
                        isChecked={formData.categoryType === 'spend'}
                        onChange={(evt) =>
                          handleChange({ name: 'categoryType', value: evt.target.value })
                        }
                        extraClass="add-item-popup__radio-button"
                      />
                      <Radio
                        text="В доходе"
                        value="income"
                        isChecked={formData.categoryType === 'income'}
                        onChange={(evt) =>
                          handleChange({ name: 'categoryType', value: evt.target.value })
                        }
                        extraClass="add-item-popup__radio-button"
                      />
                    </div>
                  </label>
                </div>
              </>
            )}

            <div className="add-item-popup__form-button-wrapper">
              <Button
                variant="secondary"
                content="text"
                text="Отменить"
                size="medium"
                onClick={handleCancelForm}
              />
              <Button
                type="submit"
                variant="primary"
                content="text"
                text="Сохранить"
                size="medium"
              />
            </div>
          </form>
        )}

        <div className="add-item-popup__button-wrapper">
          {!isAddingItem && (
            <>
              <CancelButton onClose={onClose} />
              <Button type="submit" variant="primary" content="text" text="Готово" size="medium" />
            </>
          )}
        </div>
      </section>
    </Popup>
  );
}
