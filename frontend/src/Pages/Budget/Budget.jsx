import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Budget.scss';
import SpendPopup from '../../Components/SpendPopup/SpendPopup';
import IncomePopup from '../../Components/IncomePopup/IncomePopup';
import {
  toggleSpendPopup,
  toggleIncomePopup,
  toggleRepeatExpensesPopup,
} from '../../store/slices/togglePopupSlice';
import { getUser } from '../../store/slices/userSlice';
import LeftBlock from '../../Components/LeftBlock/LeftBlock';
import RightBlock from '../../Components/RightBlock/RightBlock';
import BudgetFilter from '../../Components/BudgetFilter/BudgetFilter';
import TimeIntervalSelect from '../../Components/TimeIntervalSelect/TimeIntervalSelect';
import RepeatExpensesPopup from '../../Components/RepeatExpensesPopup/RepeatExpensesPopup';

export default function Budget() {
  const dispatch = useDispatch();

  const [isFieldset, setIsFieldset] = useState('');
  const [selectedTimeInterval, setSelectedTimeInterval] = useState('week');

  const { isIncomePopupOpen, isSpendPopupOpen, isRepeatExpensesPopupOpen } = useSelector(
    (state) => state.popup,
  );
  const isFetched = useSelector((state) => state.user.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [dispatch, isFetched]);

  const handleSpendClick = () => dispatch(toggleSpendPopup(true));
  const handleIncomeClick = () => dispatch(toggleIncomePopup(true));
  const handleRepeatExpensesClick = () => dispatch(toggleRepeatExpensesPopup(true));

  const closeSpendPopup = () => dispatch(toggleSpendPopup(false));
  const closeIncomePopup = () => dispatch(toggleIncomePopup(false));
  const closeRepeatExpensesPopup = () => dispatch(toggleRepeatExpensesPopup(false));

  const showSelect = () => {
    setIsFieldset((prevIsFieldset) => (prevIsFieldset ? '' : 'budget__select-fieldset_open'));
  };

  const showCalendar = () => {
    // Отобразить модальное окно с календарем
  };

  const handleTimeIntervalChange = (event) => {
    setSelectedTimeInterval(event.target.value);
  };

  const getTodayDate = (event) => {
    setSelectedTimeInterval(event.target.value);
  };

  return (
    <section className="budget">
      <LeftBlock />
      <section className="budget__spending">
        <BudgetFilter
          isFieldset={isFieldset}
          selectedTimeInterval={selectedTimeInterval}
          showSelect={showSelect}
          showCalendar={showCalendar}
          handleSpendClick={handleSpendClick}
          handleIncomeClick={handleIncomeClick}
          handleTimeIntervalChange={handleTimeIntervalChange}
          getTodayDate={getTodayDate}
        >
          <TimeIntervalSelect
            selectedTimeInterval={selectedTimeInterval}
            onTimeIntervalChange={getTodayDate}
          />
        </BudgetFilter>
      </section>
      <RightBlock handleRepeatExpensesClick={handleRepeatExpensesClick} />

      {isSpendPopupOpen && <SpendPopup onClose={closeSpendPopup} />}
      {isIncomePopupOpen && <IncomePopup onClose={closeIncomePopup} />}
      {isRepeatExpensesPopupOpen && <RepeatExpensesPopup onClose={closeRepeatExpensesPopup} />}
    </section>
  );
}
