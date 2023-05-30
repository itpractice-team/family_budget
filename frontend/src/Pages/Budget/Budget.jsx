import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './Budget.scss';
import SpendingPopup from '../../Components/SpendingPopup/SpendingPopup';
import EarningPopup from '../../Components/EarningPopup/EarningPopup';
import { toggleSpendingPopup, toggleEarningPopup } from '../../store/slices/togglePopupSlice';
import SpendingCard from '../../Components/Card/Card';

// mock data
import cat from '../../Images/cat-ic-24.svg';
import Vector from '../../Images/Vector.svg';

const spend = [
  {
    id: 1,
    header: 'Вкусняшки коту',
    text: 'Sheba с креветками',
    bank: 'Тинькофф',
    amount: '-40₽',
    categoryImg: cat,
    bankLogo: Vector,
    spending: true,
  },
  {
    id: 2,
    header: 'Вкусняшки коту',
    text: 'Sheba с креветками',
    bank: 'Тинькофф',
    amount: '-40₽',
    categoryImg: cat,
    bankLogo: Vector,
    spending: false,
  },
  {
    id: 3,
    header: 'Вкусняшки коту',
    text: 'Sheba с креветками',
    bank: 'Тинькофф',
    amount: '-40₽',
    categoryImg: cat,
    bankLogo: Vector,
    spending: true,
  },
  {
    id: 4,
    header: 'Вкусняшки коту',
    text: 'Sheba с креветками',
    bank: 'Тинькофф',
    amount: '-40₽',
    categoryImg: cat,
    bankLogo: Vector,
    spending: false,
  },
  {
    id: 5,
    header: 'Вкусняшки коту',
    text: 'Sheba с креветками',
    bank: 'Тинькофф',
    amount: '-40₽',
    categoryImg: cat,
    bankLogo: Vector,
    spending: true,
  },
  {
    id: 6,
    header: 'Вкусняшки коту',
    text: 'Sheba с креветками',
    bank: 'Тинькофф',
    amount: '-40₽',
    categoryImg: cat,
    bankLogo: Vector,
    spending: false,
  },
];

export default function Budget() {
  const dispatch = useDispatch();

  const isEarningPopupOpen = useSelector((state) => state.popup.isEarningPopupOpen);
  const isSpendingPopupOpen = useSelector((state) => state.popup.isSpendingPopupOpen);
  const isLogin = useSelector((state) => state.login.login);

  useEffect(() => {}, [isLogin, dispatch]);

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

  return (
    <section className="budget">
      <section className="budget__spending">
        <div className="budget__filtration">
          {/* filtration here */}

          <div className="budget__button-wrapper">
            <button type="button" className="budget__add-button" onClick={handleSpendingClick}>
              Добавить расход
            </button>

            <button type="button" className="budget__add-button" onClick={handleEarningClick}>
              Добавить доход
            </button>
          </div>
        </div>

        <div>{/* insert date */}</div>

        {/* replace spend to props */}
        <ul className="budget__spending-list">
          {spend &&
            spend.map((card) => {
              return <SpendingCard {...card} key={card.id} />;
            })}
        </ul>
      </section>

      {isSpendingPopupOpen && <SpendingPopup onClose={closeSpendingPopup} />}

      {isEarningPopupOpen && <EarningPopup onClose={closeEarningPopup} />}
    </section>
  );
}
