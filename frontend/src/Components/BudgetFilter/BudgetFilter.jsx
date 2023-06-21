import { useState } from 'react';
import './BudgetFilter.scss';
import TimeIntervalSelect from '../TimeIntervalSelect/TimeIntervalSelect';
import TimeInterval from '../TimeInterval/TimeInterval';
import Overlay from '../Overlay/Overlay';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

export default function BudgetFilter({
  selectedTimeInterval,
  handleTimeIntervalChange,
  onChange,
  startDate,
  endDate,
  dateFormatter,
}) {
  const [isTimeIntervalSelectOpen, setIsTimeIntervalSelectOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleTimeIntervalSelect = () => {
    setIsTimeIntervalSelectOpen(!isTimeIntervalSelectOpen);
  };

  const closeTimeIntervalSelect = () => {
    setIsTimeIntervalSelectOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
  };

  return (
    <div className="budget-filter">
      <div className="budget-filter__wrapper">
        <div className="budget-filter__select">
          <button
            className={`budget-filter__select-button ${
              isTimeIntervalSelectOpen ? 'budget-filter__select-button--open' : ''
            }`}
            type="button"
            onClick={toggleTimeIntervalSelect}
          >
            <TimeInterval
              selectedTimeInterval={selectedTimeInterval}
              dateFormatter={dateFormatter}
            />
          </button>

          <Overlay isOpen={isTimeIntervalSelectOpen} onClose={closeTimeIntervalSelect}>
            <TimeIntervalSelect
              selectedTimeInterval={selectedTimeInterval}
              onTimeIntervalChange={handleTimeIntervalChange}
            />
          </Overlay>
        </div>

        <div className="budget-filter__calendar-block">
          <button
            type="button"
            className={`budget-filter__date-button ${
              isCalendarOpen ? 'budget-filter__date-button--open' : ''
            }`}
            onClick={toggleCalendar}
          >
            По дате
          </button>

          <Overlay isOpen={isCalendarOpen} onClose={closeCalendar}>
            <div className="budget-filter__calendar-wrapper">
              <CustomDatePicker
                type="date"
                onChange={onChange}
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                selectsRange={true}
                selectsDisabledDaysInRange={true}
              />
            </div>
          </Overlay>
        </div>
      </div>
    </div>
  );
}
