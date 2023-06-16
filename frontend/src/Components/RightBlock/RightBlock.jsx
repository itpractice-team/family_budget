import { useDispatch, useSelector } from 'react-redux';
import './RightBlock.scss';
import {
  toggleRepeatExpensesPopup,
  toggleAddMoneyboxPopup,
} from '../../store/slices/togglePopupSlice';
import Moneybox from '../Moneybox/Moneybox';
import Template from '../Template/Template';
import RepeatSpend from '../RepeatSpend/RepeatSpend';
import RepeatExpensesPopup from '../RepeatExpensesPopup/RepeatExpensesPopup';
import AddMoneyboxPopup from '../AddMoneyboxPopup/AddMoneyboxPopup';

export default function RightBlock() {
  const dispatch = useDispatch();

  const { isRepeatExpensesPopupOpen, isAddMoneyboxPopupOpen } = useSelector((state) => state.popup);

  const handleRepeatExpensesClick = () => dispatch(toggleRepeatExpensesPopup(true));
  const closeRepeatExpensesPopup = () => dispatch(toggleRepeatExpensesPopup(false));

  const handleAddMoneyboxClick = () => dispatch(toggleAddMoneyboxPopup(true));
  const closeAddMoneyboxPopup = () => dispatch(toggleAddMoneyboxPopup(false));

  return (
    <section className="right-block">
      <Template title="Повторяющиеся расходы" onClick={handleRepeatExpensesClick}>
        <RepeatSpend />
      </Template>
      <Template title="Конверты на накопления" onClick={handleAddMoneyboxClick}>
        <Moneybox />
      </Template>
      {isRepeatExpensesPopupOpen && <RepeatExpensesPopup onClose={closeRepeatExpensesPopup} />}
      {isAddMoneyboxPopupOpen && <AddMoneyboxPopup onClose={closeAddMoneyboxPopup} />}
    </section>
  );
}
