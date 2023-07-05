import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moneybag from '../../Images/moneybag.svg';
import PlugRightBlock from '../PlugRightBlock/PlugRightBlock';
import { getRepeatSpendBox } from '../../store/slices/repeatSpendSlice';
import usePopup from '../../utils/hooks/usePopup';
import EditRepeatSpendPopup from '../EditRepeatSpendPopup/EditRepeatSpendPopup';
import RepeatSpendItem from '../RepeatSpendItem/RepeatSpendItem';

export default function RepeatSpend() {
  const dispatch = useDispatch();
  const repeatSpendList = useSelector((state) => state.repeatSpendBox.repeatSpendBox);
  console.log('repeatSpendList', repeatSpendList);

  const {
    isOpen: isEditRepeatSpendPopupOpen,
    openPopup: openEditRepeatSpendPopup,
    closePopup: closeEditRepeatSpendPopup,
  } = usePopup('editRepeatSpend');

  useEffect(() => {
    dispatch(getRepeatSpendBox());
  }, []);

  const handleItemClick = () => {
    openEditRepeatSpendPopup();
  };

  return (
    <section className="repeat-spend">
      {repeatSpendList.length === 0 ? (
        <PlugRightBlock icon={moneybag} subtitle="Занести расходы, которые происходят регулярно" />
      ) : (
        repeatSpendList?.map((item) => (
          <RepeatSpendItem
            key={item.id}
            title={item.name}
            target={item.amount}
            onClick={() => handleItemClick(item)}
          />
        ))
      )}

      {isEditRepeatSpendPopupOpen && <EditRepeatSpendPopup onClose={closeEditRepeatSpendPopup} />}
    </section>
  );
}
