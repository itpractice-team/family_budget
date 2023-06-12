import { useDispatch, useSelector } from 'react-redux';
import './RightBlock.scss';
import { toggleRepeatExpensesPopup } from '../../store/slices/togglePopupSlice';
import Moneybox from '../Moneybox/Moneybox';
import Template from '../Template/Template';
import RepeatSpend from '../RepeatSpend/RepeatSpend';
import RepeatExpensesPopup from '../RepeatExpensesPopup/RepeatExpensesPopup';

export default function RightBlock() {
  const dispatch = useDispatch();

  const { isRepeatExpensesPopupOpen } = useSelector((state) => state.popup);

  const handleRepeatExpensesClick = () => dispatch(toggleRepeatExpensesPopup(true));
  const closeRepeatExpensesPopup = () => dispatch(toggleRepeatExpensesPopup(false));

  return (
    <section className="right-block">
      <Template title="Повторяющиеся расходы" onClick={handleRepeatExpensesClick}>
        <RepeatSpend />
      </Template>
      <Template title="Конверты на накопления">
        <Moneybox />
      </Template>
      {isRepeatExpensesPopupOpen && <RepeatExpensesPopup onClose={closeRepeatExpensesPopup} />}
    </section>
  );
}
