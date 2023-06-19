import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TransactionList.scss';
import TransactionCard from './TransactionCard/TransactionCard';
import { getTransactionList } from '../../store/slices/transactionList';

function groupTransactionsByDate(transactions) {
  const groupedTransactions = {};

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.created);
    const formattedDate = transactionDate.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const weekDay = transactionDate.toLocaleDateString('ru-RU', { weekday: 'long' });

    if (groupedTransactions[formattedDate]) {
      groupedTransactions[formattedDate].push({ ...transaction, weekDay });
    } else {
      groupedTransactions[formattedDate] = [{ ...transaction, weekDay }];
    }
  });

  return groupedTransactions;
}

export default function TransactionList() {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.transactionList.transactionList);
  const transactionsByDate = groupTransactionsByDate(transactions);

  useEffect(() => {
    dispatch(getTransactionList());
  }, [transactions]);

  return (
    <div className="spending-list__wrapper">
      <ul className="spending-list__list">
        {Object.entries(transactionsByDate).map(([groupDate, groupTransactions]) => (
          <li className="spending-list__item" key={groupDate}>
            <div className="spending-list__date">
              <p className="spending-list__header">{groupDate}</p>
              <p className="spending-list__text">{groupTransactions[0].weekDay}</p>
            </div>

            <ul className="spending-list__list">
              {groupTransactions.map((transaction) => (
                <TransactionCard transaction={transaction} key={transaction.id} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
