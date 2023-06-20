import { useDispatch, useSelector } from 'react-redux';
import {
  toggleEditMoneyboxPopup,
  toggleDoneMoneyboxPopup,
} from '../../store/slices/togglePopupSlice';
import MoneyboxItem from '../MoneyboxItem/MoneyboxItem';
import moneybox from '../../Images/moneybox.svg';
import PlugRightBlock from '../PlugRightBlock/PlugRightBlock';
import EditMoneyboxPopup from '../EditMoneyboxPopup/EditMoneyboxPopup';
import DoneMoneyboxPopup from '../DoneMoneyboxPopup/DoneMoneyboxPopup';

export default function Moneybox() {
  const dispatch = useDispatch();

  const { isEditMoneyboxPopupOpen, isDoneMoneyboxPopupOpen } = useSelector((state) => state.popup);

  const handleItemClick = (isDone) => {
    if (isDone && !isDoneMoneyboxPopupOpen) {
      dispatch(toggleDoneMoneyboxPopup(true)); // Открыть попап для достигнутой цели
    } else if (!isDone && !isEditMoneyboxPopupOpen) {
      dispatch(toggleEditMoneyboxPopup(true)); // Открыть попап для редактирования
    }
  };

  const handleEditPopupClose = () => {
    if (isEditMoneyboxPopupOpen) {
      dispatch(toggleEditMoneyboxPopup(false)); // Закрыть попап для редактирования
    }
  };

  const handleDonePopupClose = () => {
    dispatch(toggleDoneMoneyboxPopup(false)); // Закрыть попап для достигнутой цели
  };
  return (
    <section className="moneybox">
      <MoneyboxItem
        title="На отпуск"
        balance={20000}
        target={50000}
        onClick={() => handleItemClick(false)}
      />
      <MoneyboxItem
        title="На cпонсирование космонавтики"
        balance={3000}
        target={3000}
        onClick={() => handleItemClick(true)}
      />
      {isEditMoneyboxPopupOpen && (
        <EditMoneyboxPopup onClose={handleEditPopupClose} title="На отпуск" />
      )}
      {isDoneMoneyboxPopupOpen && (
        <DoneMoneyboxPopup onClose={handleDonePopupClose} title="На cпонсирование космонавтики" />
      )}
    </section>
  );
}

<PlugRightBlock icon={moneybox} subtitle="Отложить деньги на цель для накопления" />;
