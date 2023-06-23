import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './TransactionCard.scss';
import {
  addTransaction,
  deleteTransaction,
  getTransactionList,
} from '../../../store/slices/transactionList';
import EditTransactionPopup from '../../EditTransactionPopup/EditTransactionPopup';
import usePopup from '../../../utils/hooks/usePopup';

export default function TransactionCard({ transaction }) {
  const dispatch = useDispatch();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const {
    isOpen: isEditTransactionPopupOpen,
    openPopup: openEditTransactionPopup,
    closePopup: closeEditTransactionPopup,
  } = usePopup('editTransaction');

  if (!transaction) {
    return null;
  }

  const { id, name, finance, amount, category } = transaction;

  const categoryTypeStyles = {
    1: { mathSign: '-', amountStyle: 'card__amount_spending' },
    2: { mathSign: '+', amountStyle: 'card__amount_earn' },
  };

  const { mathSign, amountStyle } =
    categoryTypeStyles[transaction.category_type] || categoryTypeStyles[2];

  const handleDelete = () => {
    dispatch(deleteTransaction(id)).then(() => {
      dispatch(getTransactionList());
    });
  };

  const handleEdit = () => {
    setSelectedTransaction(transaction);
    openEditTransactionPopup();
  };

  const handleEditTransactionPopupClose = () => {
    setSelectedTransaction(null);
    closeEditTransactionPopup();
  };

  const handleRepeatTransaction = () => {
    // Создайте объект с данными для добавления новой транзакции, используя значения из выбранной транзакции
    const newTransactionData = {
      created: transaction.created,
      category: transaction.category.id,
      name: transaction.name,
      amount: transaction.amount,
      finance: transaction.finance.id,
      category_type: transaction.category_type,
    };

    dispatch(addTransaction(newTransactionData)).then(() => {
      dispatch(getTransactionList());
    });
  };

  return (
    <li className="card">
      <div className="card__block">
        <img className="card__category" src={category.image} alt={category.name} />
        <p className="card__header">
          {category.name}
          <span className="card__text">{name}</span>
        </p>
      </div>

      <div className="card__block">
        <img className="card__bank-img" src={finance.image} alt={finance.name} />
        <p className="card__text">{finance.name}</p>
      </div>

      <div className="card__block">
        <p className={`card__amount ${amountStyle}`}>
          {mathSign}
          {amount} ₽
        </p>
      </div>

      <div className="card__block card__button-block">
        <button
          type="button"
          aria-label="Изменить"
          className="card__button card__button_edit"
          onClick={handleEdit}
        />
        <button
          type="button"
          aria-label="Удалить"
          className="card__button card__button_delete"
          onClick={handleDelete}
        />
        <button
          type="button"
          aria-label="Повторить"
          className="card__button card__button_copy"
          onClick={handleRepeatTransaction}
        />
      </div>

      {isEditTransactionPopupOpen && (
        <EditTransactionPopup
          onClose={handleEditTransactionPopupClose}
          transaction={selectedTransaction}
          categoryType={transaction.category_type}
        />
      )}
    </li>
  );
}
