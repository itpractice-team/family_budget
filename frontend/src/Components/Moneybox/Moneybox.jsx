import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoneyboxItem from '../MoneyboxItem/MoneyboxItem';
import moneybox from '../../Images/moneybox.svg';
import PlugRightBlock from '../PlugRightBlock/PlugRightBlock';
import EditMoneyboxPopup from '../EditMoneyboxPopup/EditMoneyboxPopup';
import DoneMoneyboxPopup from '../DoneMoneyboxPopup/DoneMoneyboxPopup';
import { getMoneybox } from '../../store/slices/moneybox';
import usePopup from '../../utils/hooks/usePopup';

export default function Moneybox() {
  const dispatch = useDispatch();

  const {
    isOpen: isEditMoneyboxPopupOpen,
    openPopup: openEditMoneyboxPopup,
    closePopup: closeEditMoneyboxPopup,
  } = usePopup('editMoneybox');
  const {
    isOpen: isDoneMoneyboxPopupOpen,
    openPopup: openDoneMoneyboxPopup,
    closePopup: closeDoneMoneyboxPopup,
  } = usePopup('doneMoneybox');
  const moneyboxList = useSelector((state) => state.moneybox.moneybox);

  useEffect(() => {
    dispatch(getMoneybox());
  }, []);

  const handleItemClick = (isDone) => {
    if (isDone && !isDoneMoneyboxPopupOpen) {
      openDoneMoneyboxPopup();
    } else if (!isDone && !isEditMoneyboxPopupOpen) {
      openEditMoneyboxPopup();
    }
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
        <EditMoneyboxPopup onClose={closeEditMoneyboxPopup} title="На отпуск" />
      )}
      {isDoneMoneyboxPopupOpen && (
        <DoneMoneyboxPopup onClose={closeDoneMoneyboxPopup} title="На cпонсирование космонавтики" />
      )}
    </section>
  );
}
