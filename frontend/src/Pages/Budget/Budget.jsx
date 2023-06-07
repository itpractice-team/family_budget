import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Budget.scss';
import SpendingPopup from '../../Components/SpendingPopup/SpendingPopup';
import EarningPopup from '../../Components/EarningPopup/EarningPopup';
import { toggleSpendingPopup, toggleEarningPopup } from '../../store/slices/togglePopupSlice';
import { getUser } from '../../store/slices/userSlice';
import Button from '../../ui/Button/Button';
import SpendingList from '../../Components/SpendingList/SpendingList';
import LeftBlock from '../../Components/LeftBlock/LeftBlock';
import RightBlock from '../../Components/RightBlock/RightBlock';

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
  const [isFieldset, setIsFieldset] = useState('');

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

    switch (event.target.value) {
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

  function showSelect() {
    return isFieldset ? setIsFieldset('') : setIsFieldset('budget__select-fieldset_open');
  }

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
                <label
                  className="form__input-label form__input-label_radio budget__select-option"
                  htmlFor="select-today"
                >
                  Сегодня
                  <input
                    type="radio"
                    id="select-today"
                    className="form__radio"
                    value="today"
                    name="timePeriod"
                  />
                </label>

                <label
                  className="form__input-label form__input-label_radio budget__select-option"
                  htmlFor="select-week"
                >
                  Неделя
                  <input
                    type="radio"
                    id="select-week"
                    className="form__radio"
                    value="week"
                    name="timePeriod"
                  />
                </label>

                <label
                  className="form__input-label form__input-label_radio budget__select-option"
                  htmlFor="select-mounth"
                >
                  Месяц
                  <input
                    type="radio"
                    id="select-mounth"
                    className="form__radio"
                    value="mounth"
                    name="timePeriod"
                  />
                </label>

                <label
                  className="form__input-label form__input-label_radio budget__select-option"
                  htmlFor="select-year"
                >
                  Год
                  <input
                    type="radio"
                    id="select-year"
                    className="form__radio"
                    value="year"
                    name="timePeriod"
                  />
                </label>

                <label
                  className="form__input-label form__input-label_radio budget__select-option"
                  htmlFor="select-all"
                >
                  Вся история
                  <input
                    type="radio"
                    id="select-all"
                    className="form__radio"
                    value="all"
                    name="timePeriod"
                  />
                </label>
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
