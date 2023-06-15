import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BudgetFilter.scss';
import TimeIntervalSelect from '../TimeIntervalSelect/TimeIntervalSelect';
import TimeInterval from '../TimeInterval/TimeInterval';
import Overlay from '../Overlay/Overlay';
import Button from '../../ui/Button/Button';
import SpendPopup from '../SpendPopup/SpendPopup';
import IncomePopup from '../IncomePopup/IncomePopup';
import { toggleSpendPopup, toggleIncomePopup } from '../../store/slices/togglePopupSlice';
import plus from '../../Images/icons/plus.svg';
import minus from '../../Images/icons/minus.svg';
import arrow from '../../Images/icons/icon-arrow-right.svg';

export default function BudgetFilter({ selectedTimeInterval, handleTimeIntervalChange }) {
  const dispatch = useDispatch();

  const [isTimeIntervalSelectOpen, setIsTimeIntervalSelectOpen] = useState(false);
  const { isIncomePopupOpen, isSpendPopupOpen } = useSelector((state) => state.popup);

  const handleSpendClick = () => dispatch(toggleSpendPopup(true));
  const handleIncomeClick = () => dispatch(toggleIncomePopup(true));

  const closeSpendPopup = () => dispatch(toggleSpendPopup(false));
  const closeIncomePopup = () => dispatch(toggleIncomePopup(false));

  const toggleTimeIntervalSelect = () => {
    setIsTimeIntervalSelectOpen(!isTimeIntervalSelectOpen);
  };

  const closeTimeIntervalSelect = () => {
    setIsTimeIntervalSelectOpen(false);
  };

  const showCalendar = () => {
    // Отобразить модальное окно с календарем
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
            <TimeInterval selectedTimeInterval={selectedTimeInterval} />
          </button>

          <Overlay isOpen={isTimeIntervalSelectOpen} onClose={closeTimeIntervalSelect}>
            <TimeIntervalSelect
              selectedTimeInterval={selectedTimeInterval}
              onTimeIntervalChange={handleTimeIntervalChange}
            />
          </Overlay>
        </div>
        <button type="button" className="budget-filter__date-button" onClick={showCalendar}>
          По дате
        </button>
      </div>
      <div className="budget-filter__button-wrapper">
        <Button
          variant="secondary"
          content="icon-text"
          image={minus}
          text="Расход"
          size="medium"
          onClick={handleSpendClick}
        />
        <Button
          variant="secondary"
          content="icon-text"
          image={plus}
          text="Доход"
          size="medium"
          onClick={handleIncomeClick}
        />
        <Button
          variant="secondary"
          content="icon-text"
          image={arrow}
          text="Перевод"
          size="medium"
          onClick={handleIncomeClick}
        />
      </div>
      {isSpendPopupOpen && <SpendPopup onClose={closeSpendPopup} />}
      {isIncomePopupOpen && <IncomePopup onClose={closeIncomePopup} />}
    </div>
  );
}
