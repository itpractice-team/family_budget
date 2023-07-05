// В компоненте Moneybox
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoneyboxItem from '../MoneyboxItem/MoneyboxItem';
import moneybox from '../../Images/moneybox.svg';
import PlugRightBlock from '../PlugRightBlock/PlugRightBlock';
import EditMoneyboxPopup from '../EditMoneyboxPopup/EditMoneyboxPopup';
import DoneMoneyboxPopup from '../DoneMoneyboxPopup/DoneMoneyboxPopup';
import InfoPopup from '../InfoPopup/InfoPopup';
import { getMoneybox } from '../../store/slices/moneybox';
import usePopup from '../../utils/hooks/usePopup';

export default function Moneybox() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.moneybox);

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
  const { isOpen: isInfoPopupOpen, closePopup: closeInfoPopup } = usePopup('info');
  const { openPopup: openAddMoneyboxPopup } = usePopup('addMoneybox');

  const moneyboxList = useSelector((state) => state.moneybox.moneybox);
  const [selectedMoneybox, setSelectedMoneybox] = useState(null);

  useEffect(() => {
    dispatch(getMoneybox());
  }, []);

  const handleItemClick = (item) => {
    setSelectedMoneybox(item);

    if (item.accumulated === item.amount && !isDoneMoneyboxPopupOpen) {
      openDoneMoneyboxPopup();
    } else if (!isEditMoneyboxPopupOpen) {
      openEditMoneyboxPopup();
    }
  };

  const tryAgainClick = () => {
    closeInfoPopup();
    openAddMoneyboxPopup();
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
            onClick={() => handleItemClick(item)}
          />
        ))
      )}

      {isEditMoneyboxPopupOpen && selectedMoneybox && (
        <EditMoneyboxPopup onClose={closeEditMoneyboxPopup} moneybox={selectedMoneybox} />
      )}
      {isDoneMoneyboxPopupOpen && selectedMoneybox && (
        <DoneMoneyboxPopup onClose={closeDoneMoneyboxPopup} moneybox={selectedMoneybox} />
      )}
      {isInfoPopupOpen && (
        <InfoPopup
          onClose={closeInfoPopup}
          content={error || 'Конверт успешно создан'}
          type={error ? 'error' : 'success'}
          onClick={tryAgainClick}
        />
      )}
    </section>
  );
}
