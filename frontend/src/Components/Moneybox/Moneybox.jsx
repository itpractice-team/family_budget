import { useEffect } from 'react';
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
import { getMoneybox } from '../../store/slices/moneybox';

export default function Moneybox() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoneybox());
  }, []);

  const { isEditMoneyboxPopupOpen, isDoneMoneyboxPopupOpen } = useSelector((state) => state.popup);
  const moneyboxList = useSelector((state) => state.moneybox.moneybox);

  const handleItemClick = (isDone) => {
    if (isDone && !isDoneMoneyboxPopupOpen) {
      dispatch(toggleDoneMoneyboxPopup(true));
    } else if (!isDone && !isEditMoneyboxPopupOpen) {
      dispatch(toggleEditMoneyboxPopup(true));
    }
  };

  const handleEditPopupClose = () => {
    if (isEditMoneyboxPopupOpen) {
      dispatch(toggleEditMoneyboxPopup(false));
    }
  };

  const handleDonePopupClose = () => {
    dispatch(toggleDoneMoneyboxPopup(false));
  };
  return (
    <section className="moneybox">
      {moneyboxList.length === 0 ? (
        <PlugRightBlock icon={moneybox} subtitle="Отложить деньги на цель для накопления" />
      ) : (
        moneyboxList.map((item) => (
          <MoneyboxItem
            key={item.id}
            title={item.name}
            balance={item.accumulated}
            target={item.amount}
            onClick={() => handleItemClick(item.accumulated === item.amount)}
          />
        ))
      )}

      {isEditMoneyboxPopupOpen && (
        <EditMoneyboxPopup onClose={handleEditPopupClose} title="На отпуск" />
      )}
      {isDoneMoneyboxPopupOpen && (
        <DoneMoneyboxPopup onClose={handleDonePopupClose} title="На cпонсирование космонавтики" />
      )}
    </section>
  );
}
