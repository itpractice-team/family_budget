import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TransactionCard.scss';
import { deleteTransaction } from '../../../store/slices/transactionList';
import { toggleEditTransactionPopup } from '../../../store/slices/togglePopupSlice';
import EditTransactionPopup from '../../EditTransactionPopup/EditTransactionPopup';

function TransactionCard({ transaction }) {
  const dispatch = useDispatch();

  const isEditTransactionPopupOpen = useSelector((state) => state.popup.isEditTransactionPopupOpen);

  const { id, name, finance, amount, category } = transaction;

  const categoryTypeStyles = {
    1: { mathSign: '-', amountStyle: 'card__amount_spending' },
    2: { mathSign: '+', amountStyle: 'card__amount_earn' },
  };

  const { mathSign, amountStyle } =
    categoryTypeStyles[transaction.category_type] || categoryTypeStyles[2];

  const handleDelete = () => {
    dispatch(deleteTransaction(id));
  };

  const handleEdit = () => {
    dispatch(toggleEditTransactionPopup(true));
  };

  const handleEditTransactionPopupClose = () => {
    dispatch(toggleEditTransactionPopup(false));
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
        <button type="button" aria-label="Повторить" className="card__button card__button_copy" />
      </div>
      {isEditTransactionPopupOpen && (
        <EditTransactionPopup onClose={handleEditTransactionPopupClose} transaction={transaction} />
      )}
    </li>
  );
}

export default React.memo(TransactionCard);
