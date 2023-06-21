import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import TransactionForm from '../TransactionForm/TransactionForm';
import { addTransaction, getTransactionList } from '../../store/slices/transactionList';
import useTransactionForm from '../../utils/hooks/useTransactionForm';

export default function SpendPopup({ onClose, popupSize, title, categoryType }) {
  const dispatch = useDispatch();
  const { formData, handleChange, categoryOptions, financeOptions } =
    useTransactionForm(categoryType);

  const handleAddSpend = (evt) => {
    evt.preventDefault();
    dispatch(addTransaction({ ...formData, category_type: categoryType })).then(() => {
      dispatch(getTransactionList());
      onClose();
    });
  };

  return (
    <Popup onClose={onClose} popupSize={popupSize} title={title}>
      <TransactionForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleAddSpend}
        onClose={onClose}
        categoryOptions={categoryOptions}
        financeOptions={financeOptions}
      />
    </Popup>
  );
}
