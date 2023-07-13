/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import StatisticFilter from '../StatisticFilter/StatisticFilter';
import TimeIntervalSelect from '../TimeIntervalSelect/TimeIntervalSelect';
import { setDateEnd, setDateStart } from '../../store/slices/dateSlice';

export default function StatisticDates({ dinamicChartShow }) {
  const dispatch = useDispatch();
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
      dispatch(setDateStart(start));
      dispatch(setDateEnd(end));
    } else {
      calendarValue = `${start}`;
      dispatch(setDateStart(start));
      dispatch(setDateEnd(''));
    }

    handleTimeIntervalChange(calendarValue);
  };

  return (
    <section className="main-block statistic__chart-block">
      <StatisticFilter
        selectedTimeInterval={selectedTimeInterval}
        handleTimeIntervalChange={handleTimeIntervalChange}
        getTodayDate={getTodayDate}
        // calendar's data:
        onChange={handleCalendarChange}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        dateFormatter={dateFormatter}
        dinamicChartShow={dinamicChartShow}
      >
        <TimeIntervalSelect
          selectedTimeInterval={selectedTimeInterval}
          onTimeIntervalChange={getTodayDate}
        />
      </StatisticFilter>
    </section>
  );
}
