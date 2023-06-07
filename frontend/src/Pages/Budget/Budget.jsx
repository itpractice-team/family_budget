import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Budget.scss';
import SpendingPopup from '../../Components/SpendingPopup/SpendingPopup';
import EarningPopup from '../../Components/EarningPopup/EarningPopup';
import { toggleSpendingPopup, toggleEarningPopup } from '../../store/slices/togglePopupSlice';
import { getUser } from '../../store/slices/userSlice';
import Button from '../../ui/Button/Button';
import SpendingList from '../../Components/SpendingList/SpendingList';

// mock data
import cat from '../../Images/cat-ic-24.svg';
import Vector from '../../Images/Vector.svg';

const spend = [
  {
    date: Date.now(),
    id: 1,
    cards: [
      {
        id: 1,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40',
        categoryImg: cat,
        bankLogo: Vector,
        spending: true,
      },
      {
        id: 2,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40',
        categoryImg: cat,
        bankLogo: Vector,
        spending: false,
      },
    ],
  },
  {
    date: Date.now(),
    id: 2,
    cards: [
      {
        id: 1,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40',
        categoryImg: cat,
        bankLogo: Vector,
        spending: true,
      },
      {
        id: 2,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40',
        categoryImg: cat,
        bankLogo: Vector,
        spending: false,
      },
    ],
  },
];

export default function Budget() {
  const dispatch = useDispatch();
  const [timeInterval, setTimeInterval] = useState('');

  const isEarningPopupOpen = useSelector((state) => state.popup.isEarningPopupOpen);
  const isSpendingPopupOpen = useSelector((state) => state.popup.isSpendingPopupOpen);
  const isFetched = useSelector((state) => state.user.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [dispatch, isFetched]);

  const handleSpendingClick = () => {
    dispatch(toggleSpendingPopup(true));
  };

  const handleEarningClick = () => {
    dispatch(toggleEarningPopup(true));
  };

  const closeSpendingPopup = () => {
    dispatch(toggleSpendingPopup(false));
  };

  const closeEarningPopup = () => {
    dispatch(toggleEarningPopup(false));
  };

  function getTodayDate(event) {
    const today = new Date();

    const previousDate = new Date();
    let previousDateString = '';

    const monthFormatter = new Intl.DateTimeFormat('ru', {
      month: 'long',
    });

    const monthFormatedToday = monthFormatter.format(today);

    switch (event.currentTarget.value) {
      case 'today':
        // месяцы начинаются с 0, нужно добавить 1, чтобы получить текущий
        setTimeInterval(`Сегодня: ${today.getFullYear()} ${monthFormatedToday} ${today.getDate()}`);

        break;

      case 'week':
        // вычисления даты 7 дней назад
        previousDate.setDate(previousDate.getDate() - 7);

        if (previousDate.getDate() > today.getDate()) {
          previousDateString = `${monthFormatter.format(previousDate)} ${previousDate.getDate()}`;
        } else {
          previousDateString = `${previousDate.getDate()}`;
        }

        setTimeInterval(
          `На этой неделе: ${previousDateString} ‒ ${monthFormatedToday} ${today.getDate()}`,
        );

        break;

      case 'mounth':
        // вычисления даты месяц назад
        previousDate.setMonth(previousDate.getMonth() - 1);

        if (previousDate.getFullYear() < today.getFullYear()) {
          previousDateString = `${previousDate.getFullYear()} ${monthFormatter.format(
            previousDate,
          )} ${previousDate.getDate()}`;
        } else {
          previousDateString = `${monthFormatter.format(previousDate)} ${previousDate.getDate()}`;
        }

        setTimeInterval(
          `В этом месяце: ${previousDateString} ‒ ${monthFormatedToday} ${today.getDate()}`,
        );

        break;

      case 'year':
        // вычисления даты месяц назад
        previousDate.setFullYear(previousDate.getFullYear() - 1);

        previousDateString = `${previousDate.getFullYear()} ${monthFormatter.format(
          previousDate,
        )} ${previousDate.getDate()}`;

        setTimeInterval(
          `За год: ${previousDateString} ‒ ${previousDate.getFullYear()} ${monthFormatedToday} ${today.getDate()}`,
        );
        break;

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

  return (
    <section className="budget">
      <section className="budget__spending">
        <div className="budget__filtration">
          <div className="budget__filtration-wrapper">
            <select className="budget__select" onChange={getTodayDate}>
              <option value="today" className="budget__option">
                Сегодня
              </option>
              <option value="week" className="budget__option">
                Неделя
              </option>
              <option value="mounth" className="budget__option">
                Месяц
              </option>
              <option value="year" className="budget__option">
                Год
              </option>
              <option value="all" className="budget__option">
                Вся история
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
              onClick={handleSpendingClick}
            />
            <Button
              variant="secondary"
              type="icon-text"
              text="Доход"
              size="medium"
              onClick={handleEarningClick}
            />
          </div>
        </div>

        {spend &&
          spend.map((day) => {
            return <SpendingList {...day} key={day.id} />;
          })}
      </section>

      {isSpendingPopupOpen && <SpendingPopup onClose={closeSpendingPopup} />}

      {isEarningPopupOpen && <EarningPopup onClose={closeEarningPopup} />}
    </section>
  );
}
