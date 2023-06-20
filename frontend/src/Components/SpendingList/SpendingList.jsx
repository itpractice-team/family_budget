import { useState, useEffect } from 'react';
import './SpendingList.scss';
import SpendingCard from '../Card/Card';

export default function SpendingList({ cards, date }) {
  const [operationDate, setOperationDate] = useState('');
  const [operationWeekDay, setWeekDay] = useState('');

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
        {cards &&
          cards.map((card) => {
            return <SpendingCard {...card} key={card.id} />;
          })}
      </ul>
    </div>
  );
}
