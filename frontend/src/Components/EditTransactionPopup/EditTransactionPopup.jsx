import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import TransactionForm from '../TransactionForm/TransactionForm';
import { fetchTransactionList, editTransaction } from '../../store/slices/transactionListSlice';
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

  const filteredCategoryOptions = categoryOptions.filter(
    (category) => category.category_type === categoryType,
  );

  const handleEditTransaction = (evt) => {
    evt.preventDefault();
    dispatch(
      editTransaction({
        id: transaction.id,
        formData: { ...formData, category_type: transaction.category_type },
      }),
    ).then(() => {
      dispatch(fetchTransactionList());
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
          created: formData.created,
          category: selectedCategoryOption ? selectedCategoryOption.id : '',
          name: formData.name,
          amount: formData.amount,
          finance: selectedFinanceOption ? selectedFinanceOption.id : '',
        }}
        handleChange={handleChange}
        handleSubmit={handleEditTransaction}
        categoryOptions={filteredCategoryOptions}
        financeOptions={financeOptions}
        onClose={onClose}
        categoryType={transaction.category_type}
      />
    </Popup>
  );
}
