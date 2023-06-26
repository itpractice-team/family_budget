import '../RepeatExpensesPopup.scss';
import { useState } from 'react';

export default function DayBtn({ activeDate }) {
  const [count, setCount] = useState('1');
  let ending = 'ый';
  let period = 'день';

  if (activeDate === 'Неделя') {
    ending = 'ую';
    period = 'неделю';
  }
  if (activeDate === 'Месяц') {
    period = 'месяц';
  }
  if (activeDate === 'Год') {
    period = 'год';
  }

  const handleCount = ({ target }) => {
    const re = /^[0-9\b]+$/;
    const { value } = target;
    if (value === '' || re.test(value)) {
      setCount(value);
    }
  };

  return (
    <div>
      <p className="repeat-expenses__text">
        Повторять кажд{ending}
        <input
          className="repeat-expenses__input-count"
          value={count}
          type="text"
          maxLength={2}
          onChange={handleCount}
        />{' '}
        {period}
      </p>
    </div>
  );
}
