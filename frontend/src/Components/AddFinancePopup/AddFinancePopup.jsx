import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AddItemPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import CancelButton from '../CancelButton/CancelButton';
import plus from '../../Images/icons/plus.svg';
import useDropdown from '../../utils/hooks/useDropdown';
import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import { getFinanceList } from '../../store/slices/finance';

export default function AddItemPopup({ onClose, itemType }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFinanceList());
  }, []);

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [popupSize, setPopupSize] = useState('popup_s');

  const itemList = useSelector((state) => {
    if (itemType === 'finance') {
      return state.userFinance.finance;
    }
    if (itemType === 'categories') {
      return state.categories.categories;
    }
    return [];
  });

  const itemDropdown = useDropdown(itemList);

  const [formData, setFormData] = useState({
    item: '',
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      item: itemDropdown.selectedOption,
    }));
  }, [itemDropdown.selectedOption]);

  useEffect(() => {
    if (itemList.length > 0 && !formData.item) {
      setFormData((prevData) => ({ ...prevData, item: itemList[0].id }));
    }
  }, [itemList, formData.item]);

  const handleChange = (data) => {
    const { name, value } = data;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (itemList.length > 0 && !formData.item) {
      handleChange({ name: 'item', value: itemList[0].id });
    }
  }, [itemList, formData.item]);

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
            <SelectButtonWrapper
              label={`Название ${itemType === 'finance' ? 'счета' : 'категории'}`}
              options={itemList}
              initialValue={formData.item}
              imageKey="image"
              nameKey="name"
              altText="Иконка"
              handleOptionChange={(value) => handleChange({ name: 'item', value })}
            />

            {itemType === 'accounts' && (
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
