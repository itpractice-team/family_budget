import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moneybag from '../../Images/moneybag.svg';
import PlugRightBlock from '../PlugRightBlock/PlugRightBlock';
import { getRepeatSpendBox } from '../../store/slices/repeatSpendSlice';
import usePopup from '../../utils/hooks/usePopup';
import EditRepeatSpendPopup from '../EditRepeatSpendPopup/EditRepeatSpendPopup';
import RepeatSpendItem from '../RepeatSpendItem/RepeatSpendItem';

export default function RepeatSpend() {
  const dispatch = useDispatch();
  const [repeatSpend, setRepeatSpend] = useState(null);

  const repeatSpendList = useSelector((state) => state.repeatSpendBox.repeatSpendBox);
  console.log('repeatSpendList', repeatSpendList);
  const arr = [
    {
      name: 'Моб',
      amount: 5000,
      category: 228,
      created: '12.07.2023',
      repeat_type: 0,
      repeat_period: 1,
      type_week: [],
      to_date: '12.08.2023',
    },
    {
      name: 'Гулянки',
      amount: 15000,
      category: 228,
      created: '12.07.2023',
      repeat_type: 0,
      repeat_period: 0,
      type_week: [],
      to_date: '',
    },
  ];
  const {
    isOpen: isEditRepeatSpendPopupOpen,
    openPopup: openEditRepeatSpendPopup,
    closePopup: closeEditRepeatSpendPopup,
  } = usePopup('editRepeatSpend');

  useEffect(() => {
    dispatch(getRepeatSpendBox());
  }, []);

  const handleItemClick = (item) => {
    setRepeatSpend(item);
    openEditRepeatSpendPopup();
  };

  return (
    <section className="repeat-spend">
      {/* {repeatSpendList.length === 0 ? ( */}
      {arr.length === 0 ? (
        <PlugRightBlock icon={moneybag} subtitle="Занести расходы, которые происходят регулярно" />
      ) : (
        // repeatSpendList?.map((item) => (
        arr?.map((item) => (
          <RepeatSpendItem
            key={item.id}
            title={item.name}
            amount={item.amount}
            onClick={() => handleItemClick(item)}
          />
        ))
      )}

      {isEditRepeatSpendPopupOpen && (
        <EditRepeatSpendPopup
          onClose={closeEditRepeatSpendPopup}
          repeatSpend={repeatSpend}
          categoryType={1}
        />
      )}
    </section>
  );
}
