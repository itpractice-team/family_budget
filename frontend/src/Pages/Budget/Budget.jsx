import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Budget.scss';
import SpendPopup from '../../Components/SpendPopup/SpendPopup';
import IncomePopup from '../../Components/IncomePopup/IncomePopup';
import { toggleSpendPopup, toggleIncomePopup } from '../../store/slices/togglePopupSlice';
import { getUser } from '../../store/slices/userSlice';
import Button from '../../ui/Button/Button';
import SpendingList from '../../Components/SpendingList/SpendingList';
import LeftBlock from '../../Components/LeftBlock/LeftBlock';
import RightBlock from '../../Components/RightBlock/RightBlock';

// mock data
import cat from '../../Images/cat.svg';
import bank from '../../Images/bank.svg';

const spend = [
  {
    date: '02 апреля 2023',
    weekDay: 'воскресенье',
    id: 1,
    cards: [
      {
        id: 1,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40₽',
        categoryImg: cat,
        bankLogo: bank,
        spending: true,
      },
      {
        id: 2,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40₽',
        categoryImg: cat,
        bankLogo: bank,
        spending: false,
      },
    ],
  },
  {
    date: '02 апреля 2023',
    weekDay: 'воскресенье',
    id: 2,
    cards: [
      {
        id: 1,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40₽',
        categoryImg: cat,
        bankLogo: bank,
        spending: true,
      },
      {
        id: 2,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40₽',
        categoryImg: cat,
        bankLogo: bank,
        spending: false,
      },
    ],
  },
];

export default function Budget() {
  const dispatch = useDispatch();
  const [timeInterval, setTimeInterval] = useState('');

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
    let date = '';
    let formatter = null;

    switch (event.currentTarget.value) {
      case 'today':
        formatter = new Intl.DateTimeFormat('ru', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });

        date = formatter.format(today);
        setTimeInterval(date);

        break;

      case 'week':
        break;

      case 'mounth':
        formatter = new Intl.DateTimeFormat('ru', {
          year: 'numeric',
          month: 'long',
        });

        date = formatter.format(today);
        setTimeInterval(date);

        break;

      case 'year':
        formatter = new Intl.DateTimeFormat('ru', {
          year: 'numeric',
        });

        date = formatter.format(today);
        setTimeInterval(date);

        break;

      case 'all':
        setTimeInterval('Вся история');

        break;

      default:
        setTimeInterval('Выберите время');

        break;
    }
  }

  function showCalendar() {
    // modal & calendar
  }

  return (
    <section className="budget">
      <LeftBlock />
      <section className="budget__spending">
        <div className="budget__filtration">
          <div className="budget__filtration-wrapper">
            <select className="budget__select" onChange={getTodayDate}>
              <option value="today" className="budget__option">
                {`Сегодня ${timeInterval}`}
              </option>
              <option value="week" className="budget__option">
                {timeInterval ? `На этой неделе ${timeInterval}` : 'Неделя'}
              </option>
              <option value="mounth" className="budget__option">
                {timeInterval ? `${timeInterval}` : 'Месяц'}
              </option>
              <option value="year" className="budget__option">
                {timeInterval ? `В году ${timeInterval}` : 'Год'}
              </option>
              <option value="all" className="budget__option">
                {timeInterval ? `В году ${timeInterval}` : 'Вся история'}
              </option>
            </select>

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

        {spend &&
          spend.map((day) => {
            return <SpendingList {...day} key={day.id} />;
          })}
      </section>
      <RightBlock />

      {isSpendPopupOpen && <SpendPopup onClose={closeSpendPopup} />}

      {isIncomePopupOpen && <IncomePopup onClose={closeIncomePopup} />}
    </section>
  );
}
