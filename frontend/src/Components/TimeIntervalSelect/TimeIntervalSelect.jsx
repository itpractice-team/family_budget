import React from 'react';
import Radio from '../../ui/Radio/Radio';

export default function TimeIntervalSelect({ selectedTimeInterval, onTimeIntervalChange }) {
  const timeIntervals = [
    { text: 'Сегодня', value: 'today' },
    { text: 'Неделя', value: 'week' },
    { text: 'Месяц', value: 'month' },
    { text: 'Год', value: 'year' },
    { text: 'Вся история', value: 'all' },
  ];

  return (
    <fieldset className="budget__select-fieldset" onChange={onTimeIntervalChange} name="timePeriod">
      {timeIntervals.map((interval) => (
        <Radio
          key={interval.value}
          {...interval}
          isChecked={selectedTimeInterval === interval.value}
          onChange={onTimeIntervalChange}
        />
      ))}
    </fieldset>
  );
}
