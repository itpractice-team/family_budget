import { useState } from 'react';
import './MainBlock.scss';
import BudgetFilter from '../BudgetFilter/BudgetFilter';
import TimeIntervalSelect from '../TimeIntervalSelect/TimeIntervalSelect';
import AddOperationBlock from '../AddOperationBlock/AddOperationBlock';

export default function MainBlock() {
  const [selectedTimeInterval, setSelectedTimeInterval] = useState('Неделя');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const dateFormatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const handleTimeIntervalChange = (value) => {
    setSelectedTimeInterval(value);
  };

  const getTodayDate = (event) => {
    setSelectedTimeInterval(event.target.value);
  };

  const handleCalendarChange = (dates) => {
    let [start, end] = dates;
    let calendarValue = '';

    setStartDate(start);
    setEndDate(end);

    const startString = new Date(start);
    start = dateFormatter.format(startString);

    const endString = new Date(end);
    end = dateFormatter.format(endString);

    if (end !== null && start !== end && end !== '01.01.1970') {
      calendarValue = `${start} - ${end}`;
    } else {
      calendarValue = `${start}`;
    }

    handleTimeIntervalChange(calendarValue);
  };

  return (
    <section className="main-block">
      <AddOperationBlock />
      <BudgetFilter
        selectedTimeInterval={selectedTimeInterval}
        handleTimeIntervalChange={handleTimeIntervalChange}
        getTodayDate={getTodayDate}
        // calendar's data:
        onChange={handleCalendarChange}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        dateFormatter={dateFormatter}
      >
        <TimeIntervalSelect
          selectedTimeInterval={selectedTimeInterval}
          onTimeIntervalChange={getTodayDate}
        />
      </BudgetFilter>
    </section>
  );
}
