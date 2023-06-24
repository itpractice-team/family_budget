/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AddItemPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import CancelButton from '../CancelButton/CancelButton';
import plus from '../../Images/icons/plus.svg';
import useDropdown from '../../utils/hooks/useDropdown';
import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import {
  getUserFinance,
  getUserCategories,
} from '../../store/slices/userFinanceAndCategoriesSlice';
import { getFinanceOptions, getCategoryOptions } from '../../store/slices/itemOptions';

export default function AddItemPopup({ onClose, itemType }) {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [popupSize, setPopupSize] = useState('popup_s');

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

  return (
    <Popup onClose={onClose} popupSize={popupSize} title={popupTitle}>
      <section className="add-item__content">
        <div className="add-item__list">
          {itemList.map((item) => (
            <article key={item.id} className="add-item__list-item">
              <div className="list-item__info">
                <img src={item.image} alt={item.name} className="item__image" />
                <p className="item__name">{item.name}</p>
              </div>
              <button className="list-item__button-delete" aria-label="Удалить" />
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
            extraClass="add-item__button-add"
            onClick={handleAddItemClick}
          />
        ) : (
          <form className="form">
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
                  className="form__input-label form__input-label_arr"
                  htmlFor="SpendingPopup-amount"
                >
                  Текущий баланс
                  <input
                    type="number"
                    name="SpendingPopup-amount"
                    id="SpendingPopup-amount"
                    className="form__input form__input_number"
                  />
                </label>
              </>
            ) : (
              <>
                <div className="form__input-block">
                  <label className="form__input-label" htmlFor="categoryName">
                    Название категории
                    <input
                      id="categoryName"
                      name="categoryName"
                      className="form__input"
                      type="text"
                      placeholder="Введите название"
                      value={formData.categoryName}
                      onChange={(evt) =>
                        handleChange({ name: 'categoryName', value: evt.target.value })
                      }
                    />
                  </label>
                </div>

                <div className="form__input-block">
                  <label className="form__input-label" htmlFor="selectIcon">
                    Выберите иконку
                    <div className="icon-list">
                      {categoryOptions.map((option) => (
                        <button
                          key={option.id}
                          className={`icon-button ${
                            option.image === formData.categoryIcon ? 'selected' : ''
                          }`}
                          onClick={() =>
                            handleChange({ name: 'categoryIcon', value: option.image })
                          }
                        >
                          <img
                            src={option.image}
                            alt="Иконка категории"
                            className={`icon item__icon ${
                              option.image === formData.categoryIcon ? 'selected' : ''
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </label>
                </div>
              </>
            )}

            <div className="button-wrapper">
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

        <div className="form__button-wrapper form__button-wrapper_account">
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
