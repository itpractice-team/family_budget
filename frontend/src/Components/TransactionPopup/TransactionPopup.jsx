import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import TransactionForm from '../TransactionForm/TransactionForm';
import { addTransaction, fetchTransactionList } from '../../store/slices/transactionListSlice';
import useTransactionForm from '../../utils/hooks/useTransactionForm';

export default function TransactionPopup({ onClose, popupSize, title, categoryType }) {
  const dispatch = useDispatch();
  const { formData, handleChange, categoryOptions, financeOptions } = useTransactionForm(
    null,
    categoryType,
  );

  const handleAddTransaction = (evt) => {
    evt.preventDefault();
    dispatch(addTransaction({ ...formData, category_type: categoryType })).then(() => {
      dispatch(fetchTransactionList());
      onClose();
    });
  };

  return (
    <Popup onClose={onClose} popupSize={popupSize} title={title}>
      <TransactionForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleAddTransaction}
        onClose={onClose}
        categoryOptions={categoryOptions}
        financeOptions={financeOptions}
        categoryType={categoryType}
      />
    </Popup>
  );
}
