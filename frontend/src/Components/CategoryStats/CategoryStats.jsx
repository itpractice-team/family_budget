import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import Overlay from '../Overlay/Overlay';
import TimeInterval from '../TimeInterval/TimeInterval';
import './CategoryStats.scss';

export default function CategoryStats({ header }) {
  const [selectedTimeInterval, setSelectedTimeInterval] = useState('Неделя');

  const handleTimeIntervalChange = (value) => {
    setSelectedTimeInterval(value);
  };

  const [isTimeIntervalSelectOpen, setIsTimeIntervalSelectOpen] = useState(false);
  const timeIntervals = ['Сегодня', 'Неделя', 'Месяц', 'Год', 'Вся история'];

  function closeTimeIntervalSelect() {
    setIsTimeIntervalSelectOpen(false);
  }

  const toggleTimeIntervalSelect = () => {
    setIsTimeIntervalSelectOpen(!isTimeIntervalSelectOpen);
  };

  // function handleTimeSelect() {}

  return (
    <>
      <h2 className="category__header">{header}</h2>
      <div className="category__diagram">{/* graphic  here */}</div>
      <div className="category__legend">
        {/*  "budget-filter__select" - кусок кода с работающей кнопкой. из фильтрации. Нужно отрефакторить   */}

        <div className="category__block">
          <div className="budget-filter__select">
            <button
              className={`budget-filter__select-button ${
                isTimeIntervalSelectOpen ? 'budget-filter__select-button--open' : ''
              }`}
              type="button"
              onClick={toggleTimeIntervalSelect}
            >
              <TimeInterval selectedTimeInterval={selectedTimeInterval} />
            </button>

            <Overlay isOpen={isTimeIntervalSelectOpen} onClose={closeTimeIntervalSelect}>
              <div className="timeinterval-select">
                <Dropdown
                  onOptionChange={handleTimeIntervalChange}
                  options={timeIntervals}
                  selectedOption={selectedTimeInterval}
                />
              </div>
            </Overlay>
          </div>
        </div>
      </div>
    </>
  );
}
