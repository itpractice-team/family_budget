import { useState } from 'react';
import './MainBlock.scss';
import BudgetFilter from '../BudgetFilter/BudgetFilter';
import TimeIntervalSelect from '../TimeIntervalSelect/TimeIntervalSelect';
import AddOperationBlock from '../AddOperationBlock/AddOperationBlock';

export default function MainBlock() {
  const [selectedTimeInterval, setSelectedTimeInterval] = useState('Неделя');

  const handleTimeIntervalChange = (value) => {
    setSelectedTimeInterval(value);
  };

  const getTodayDate = (event) => {
    setSelectedTimeInterval(event.target.value);
  };

  return (
    <section className="main-block">
      <AddOperationBlock />
      <BudgetFilter
        selectedTimeInterval={selectedTimeInterval}
        handleTimeIntervalChange={handleTimeIntervalChange}
        getTodayDate={getTodayDate}
      >
        <TimeIntervalSelect
          selectedTimeInterval={selectedTimeInterval}
          onTimeIntervalChange={getTodayDate}
        />
      </BudgetFilter>
    </section>
  );
}
