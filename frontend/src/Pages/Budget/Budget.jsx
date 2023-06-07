import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Budget.scss';
import SpendingPopup from '../../Components/SpendingPopup/SpendingPopup';
import EarningPopup from '../../Components/EarningPopup/EarningPopup';
import { toggleSpendingPopup, toggleEarningPopup } from '../../store/slices/togglePopupSlice';
import { getUser } from '../../store/slices/userSlice';
import Button from '../../ui/Button/Button';
import SpendingList from '../../Components/SpendingList/SpendingList';
import LeftBlock from '../../Components/LeftBlock /LeftBlock';
import RightBlock from '../../Components/RightBlock/RightBlock';

// mock data
import cat from '../../Images/cat-ic-24.svg';
import Vector from '../../Images/Vector.svg';

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
        bankLogo: Vector,
        spending: true,
      },
      {
        id: 2,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40₽',
        categoryImg: cat,
        bankLogo: Vector,
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
        bankLogo: Vector,
        spending: true,
      },
      {
        id: 2,
        header: 'Вкусняшки коту',
        text: 'Sheba с креветками',
        bank: 'Тинькофф',
        amount: '40₽',
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
              onClick={handleSpendingClick}
            />
            <Button
              variant="secondary"
              type="icon-text"
              text="Доход"
              size="medium"
              extraClass="button__budget"
              onClick={handleEarningClick}
            />
          </div>
        </div>

        {spend &&
          spend.map((day) => {
            return <SpendingList {...day} key={day.id} />;
          })}
      </section>
      <RightBlock />

      {isSpendingPopupOpen && <SpendingPopup onClose={closeSpendingPopup} />}

      {isEarningPopupOpen && <EarningPopup onClose={closeEarningPopup} />}
    </section>
  );
}
