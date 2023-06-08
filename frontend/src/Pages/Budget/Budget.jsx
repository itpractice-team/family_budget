/* eslint-disable prefer-template */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Budget.scss';
import SpendPopup from '../../Components/SpendPopup/SpendPopup';
import IncomePopup from '../../Components/IncomePopup/IncomePopup';
import { toggleSpendPopup, toggleIncomePopup } from '../../store/slices/togglePopupSlice';
import { getUser } from '../../store/slices/userSlice';
import Button from '../../ui/Button/Button';
import Radio from '../../ui/Radio/Radio';
import LeftBlock from '../../Components/LeftBlock/LeftBlock';
import RightBlock from '../../Components/RightBlock/RightBlock';

export default function Budget() {
  const dispatch = useDispatch();
  const [timeInterval, setTimeInterval] = useState('');
  console.log(timeInterval);
  const [isFieldset, setIsFieldset] = useState('');
  const [selectedTimeInterval, setSelectedTimeInterval] = useState('week');

  const isIncomePopupOpen = useSelector((state) => state.popup.isIncomePopupOpen);
  const isSpendPopupOpen = useSelector((state) => state.popup.isSpendPopupOpen);
  const isFetched = useSelector((state) => state.user.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [dispatch, isFetched]);

  const handleSpendClick = () => {
    dispatch(toggleSpendPopup(true));
  };
  const handleIncomeClick = () => {
    dispatch(toggleIncomePopup(true));
  };
  const closeSpendPopup = () => {
    dispatch(toggleSpendPopup(false));
  };
  const closeIncomePopup = () => {
    dispatch(toggleIncomePopup(false));
  };

  function getTodayDate(event) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const formatter = new Intl.DateTimeFormat('ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const formattedToday = `Сегодня: ${day < 10 ? '0' + day : day}.${
      month < 10 ? '0' + month : month
    }.${year}`;

    setSelectedTimeInterval(event.target.value);

    switch (event.target.value) {
      case 'today':
        setTimeInterval(formattedToday);
        break;

      case 'week': {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6); // 6 дней назад (вроде, так правильно считать)
        const formattedWeekStart = formatter.format(weekStart);
        const formattedWeekEnd = formatter.format(today);
        setTimeInterval(`На этой неделе: ${formattedWeekStart} - ${formattedWeekEnd}`);
        break;
      }

      case 'month': {
        // месяц назад от текущей даты
        const monthStart = new Date(today.getFullYear(), today.getMonth() - 1, 7);
        const monthEnd = new Date(today.getFullYear(), today.getMonth(), 8);
        const formattedMonthStart = formatter.format(monthStart);
        const formattedMonthEnd = formatter.format(monthEnd);
        setTimeInterval(`За месяц: ${formattedMonthStart} - ${formattedMonthEnd}`);
        break;
      }

      case 'year': {
        // год назад от текущей даты
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        const formattedYearAgo = formatter.format(yearAgo);
        const formattedTodayForYear = formatter.format(today);
        setTimeInterval(`За год: ${formattedYearAgo} - ${formattedTodayForYear}`);
        break;
      }

      case 'all':
        setTimeInterval('Вся история');
        break;

      default:
        setTimeInterval('Выберите период');
        break;
    }
  }

  function showCalendar() {
    // modal & calendar
  }

  function showSelect() {
    return isFieldset ? setIsFieldset('') : setIsFieldset('budget__select-fieldset_open');
  }

  const timeIntervals = [
    { text: 'Сегодня', value: 'today' },
    { text: 'Неделя', value: 'week' },
    { text: 'Месяц', value: 'month' },
    { text: 'Год', value: 'year' },
    { text: 'Вся история', value: 'all' },
  ];

  return (
    <section className="budget">
      <LeftBlock />
      <section className="budget__spending">
        <div className="budget__filtration">
          <div className="budget__filtration-wrapper">
            <div className={`budget__select ${isFieldset}`}>
              <button className="budget__select-button" type="button" onClick={showSelect}>
                {timeInterval || 'На этой неделе'}
              </button>

              <fieldset
                className="budget__select-fieldset"
                onChange={getTodayDate}
                name="timePeriod"
              >
                {timeIntervals.map((interval) => (
                  <Radio
                    key={interval.value}
                    text={interval.text}
                    value={interval.value}
                    isChecked={selectedTimeInterval === interval.value}
                    onChange={getTodayDate}
                    disabled={false}
                    extraClass=""
                  />
                ))}
              </fieldset>
            </div>

            <button type="button" className="budget__filtration-button" onClick={showCalendar}>
              По дате
            </button>
          </div>

          <div className="budget__button-wrapper">
            <Button
              variant="secondary"
              type="icon-text"
              text="Расход"
              size="medium"
              extraClass="button__budget"
              onClick={handleSpendClick}
            />
            <Button
              variant="secondary"
              type="icon-text"
              text="Доход"
              size="medium"
              extraClass="button__budget"
              onClick={handleIncomeClick}
            />
          </div>
        </div>
      </section>
      <RightBlock />

      {isSpendPopupOpen && <SpendPopup onClose={closeSpendPopup} />}
      {isIncomePopupOpen && <IncomePopup onClose={closeIncomePopup} />}
    </section>
  );
}
