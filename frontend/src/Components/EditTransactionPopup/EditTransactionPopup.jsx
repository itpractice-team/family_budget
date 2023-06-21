import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import TransactionForm from '../TransactionForm/TransactionForm';
import { addTransaction, getTransactionList } from '../../store/slices/transactionList';
import useTransactionForm from '../../utils/hooks/useTransactionForm';

export default function EditTransactionPopup({ onClose, transaction, categoryType }) {
  const dispatch = useDispatch();
  const { formData, handleChange, categoryOptions, financeOptions } = useTransactionForm(
    transaction,
    categoryType,
  );

  if (!transaction) {
    return null;
  }

  const selectedCategoryOption = categoryOptions.find(
    (option) => option.id === transaction.category.id,
  );
  const selectedFinanceOption = financeOptions.find(
    (option) => option.id === transaction.finance.id,
  );

  const handleAddSpend = (evt) => {
    evt.preventDefault();
    dispatch(addTransaction({ ...formData, category_type: transaction.category_type })).then(() => {
      dispatch(getTransactionList());
      onClose();
    });
  };

  return (
    <Popup
      onClose={onClose}
      popupSize="popup_edit-operation"
      title={transaction.name}
      subtitle={transaction.category.name}
    >
      <TransactionForm
        formData={{
          created: new Date(transaction.created).toLocaleDateString('ru-RU'),
          category: selectedCategoryOption ? selectedCategoryOption.id : '',
          name: transaction.name,
          amount: transaction.amount,
          finance: selectedFinanceOption ? selectedFinanceOption.id : '',
        }}
        handleChange={handleChange}
        handleSubmit={handleAddSpend}
        categoryOptions={categoryOptions}
        financeOptions={financeOptions}
        onClose={onClose}
        categoryType={transaction.category_type}
      />
    </Popup>
  );
}
