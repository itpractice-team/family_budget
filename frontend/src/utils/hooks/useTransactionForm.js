import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useDropdown from './useDropdown';

const useTransactionForm = (initialTransaction, categoryType) => {
  const { finance, categories } = useSelector((state) => ({
    finance: state.userFinance.finance,
    categories: state.categories.categories,
  }));

  const categoryDropdown = useDropdown(initialTransaction?.category?.id || '', categories);
  const financeDropdown = useDropdown(initialTransaction?.finance?.id || '', finance);

  const [formData, setFormData] = useState({
    created: initialTransaction?.created
      ? new Date(initialTransaction.created).toLocaleDateString('ru-RU')
      : '',

    category: initialTransaction?.category?.id || '',
    name: initialTransaction?.name || '',
    amount: initialTransaction?.amount || '',
    finance: initialTransaction?.finance?.id || '',
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

  return {
    formData,
    handleChange: (data) => {
      const { name, value } = data;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    categoryOptions: categories,
    financeOptions: finance,
    categoryType,
  };
};

export default useTransactionForm;
