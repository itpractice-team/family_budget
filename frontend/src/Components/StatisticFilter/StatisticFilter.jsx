import { useState } from 'react';
import './StatisticFilter.scss';
import TimeIntervalSelect from '../TimeIntervalSelect/TimeIntervalSelect';
import TimeInterval from '../TimeInterval/TimeInterval';
import Overlay from '../Overlay/Overlay';
import Button from '../../ui/Button/Button';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

export default function StatisticFilter({
  selectedTimeInterval,
  handleTimeIntervalChange,
  onChange,
  startDate,
  endDate,
  dateFormatter,
  dinamicChartShow,
}) {
  const [isTimeIntervalSelectOpen, setIsTimeIntervalSelectOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDinamicOn = () => dinamicChartShow(true);
  const handleDifferenceOn = () => dinamicChartShow(false);

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
    <div className="statistic-filter">
      <div className="statistic-filter__wrapper">
        <div className="statistic-filter__select">
          <button
            className={`statistic-filter__select-button ${
              isTimeIntervalSelectOpen ? 'statistic-filter__select-button--open' : ''
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

        <div className="statistic-filter__calendar-block">
          <button
            type="button"
            className={`statistic-filter__date-button ${
              isCalendarOpen ? 'statistic-filter__date-button--open' : ''
            }`}
            onClick={toggleCalendar}
          >
            По дате
          </button>

          <Overlay isOpen={isCalendarOpen} onClose={closeCalendar}>
            <div className="statistic-filter__calendar-wrapper">
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

      <div className="statistic-filter__button-wrapper">
        <Button
          variant="secondary"
          content="text"
          type="button"
          text="Показывать динамику"
          size="small"
          onClick={handleDinamicOn}
        />
        <Button
          variant="secondary"
          type="button"
          content="text"
          text="Показывать разницу"
          size="small"
          onClick={handleDifferenceOn}
        />
        
      </div>
      <Button
          variant="primary"
          type="button"
          content="text"
          text="Выгрузить данные"
          size="medium"
          // onClick={handleDifferenceOn}
        />
    </div>
  );
}
