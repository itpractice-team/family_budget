// SpendPopup.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../Popup/Popup';
import SpendForm from './SpendForm';
import { toggleSpendPopup } from '../../store/slices/togglePopupSlice';
import { addTransaction } from '../../store/slices/transactionList';
import useDropdown from '../../utils/hooks/useDropdown';

export default function SpendPopup({ onClose }) {
  const dispatch = useDispatch();
  const { finance, categories } = useSelector((state) => ({
    finance: state.userFinance.finance,
    categories: state.categories.categories,
  }));

  const categoryDropdown = useDropdown(categories?.[0]?.id || '', categories);
  const financeDropdown = useDropdown(finance?.[0]?.id || '', finance);

  const [formData, setFormData] = useState({
    created: '',
    category: '',
    name: '',
    amount: '',
    finance: '',
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      category: categoryDropdown.selectedOption,
      finance: financeDropdown.selectedOption,
    }));
  }, [categoryDropdown.selectedOption, financeDropdown.selectedOption]);

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

  const handleChange = (data) => {
    const { name, value } = data;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSpend = (evt) => {
    evt.preventDefault();
    dispatch(addTransaction({ ...formData, category_type: 1 })).then(() => {
      dispatch(toggleSpendPopup(false));
    });
  };

  const handleCancel = (evt) => {
    evt.preventDefault();
    dispatch(toggleSpendPopup(false));
  };

  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Добавить расход">
      <SpendForm
        formData={formData}
        handleChange={handleChange}
        handleAddSpend={handleAddSpend}
        handleCancel={handleCancel}
        categoryOptions={categories}
        financeOptions={finance}
      />
    </Popup>
  );
}
