import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import TransactionForm from '../TransactionForm/TransactionForm';
import { addTransaction, fetchTransactionList } from '../../store/slices/transactionListSlice';
import useTransactionForm from '../../utils/hooks/useTransactionForm';

export default function TransactionPopup({ onClose, popupSize, title, categoryType }) {
  const dispatch = useDispatch();
  const { formData, handleChange, categoryOptions, financeOptions } =
    useTransactionForm(categoryType);

  const handleAddSpend = (evt) => {
    evt.preventDefault();
    dispatch(addTransaction({ ...formData, category_type: categoryType })).then(() => {
      dispatch(fetchTransactionList());
      onClose();
    });
  };

  const filteredCategoryOptions = categoryOptions.filter(
    (category) => category.category_type === categoryType,
  );

  return (
    <Popup onClose={onClose} popupSize={popupSize} title={title}>
      <TransactionForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleAddSpend}
        onClose={onClose}
        categoryOptions={filteredCategoryOptions}
        financeOptions={financeOptions}
        categoryType={categoryType}
      />
    </Popup>
  );
}
