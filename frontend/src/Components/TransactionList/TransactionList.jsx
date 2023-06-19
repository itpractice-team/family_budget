import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TransactionList.scss';
import TransactionCard from './TransactionCard/TransactionCard';
import { getTransactionList } from '../../store/slices/transactionList';

export default function TransactionList({ date }) {
  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transactionList.transactionList);
  console.log(transactionList);

  const [operationDate, setOperationDate] = useState('');
  const [operationWeekDay, setWeekDay] = useState('');

  useEffect(() => {
    dispatch(getTransactionList());
  }, []);

  useEffect(() => {
    const dateFormatter = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedDate = dateFormatter.format(date);
    setOperationDate(formattedDate);

    const weekDayFormatter = new Intl.DateTimeFormat('ru', {
      weekday: 'long',
    });

    const formattedWeekDay = weekDayFormatter.format(date);
    setWeekDay(formattedWeekDay);
  }, [date]);

  return (
    <div className="spending-list__wrapper">
      <div>
        <h3 className="spending-list__header">{operationDate}</h3>
        <p className="spending-list__text">{operationWeekDay}</p>
      </div>

      <ul className="spending-list__list">
        {transactionList &&
          transactionList.map((transaction) => {
            return <TransactionCard transaction={transaction} key={transaction.id} />;
          })}
      </ul>
    </div>
  );
}
