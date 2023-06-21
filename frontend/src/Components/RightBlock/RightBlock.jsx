import './RightBlock.scss';
import Moneybox from '../Moneybox/Moneybox';
import Template from '../Template/Template';
import RepeatSpend from '../RepeatSpend/RepeatSpend';
import RepeatExpensesPopup from '../RepeatExpensesPopup/RepeatExpensesPopup';
import AddMoneyboxPopup from '../AddMoneyboxPopup/AddMoneyboxPopup';
import usePopup from '../../utils/hooks/usePopup';

export default function RightBlock() {
  const {
    isOpen: isRepeatExpensesPopupOpen,
    openPopup: openRepeatExpensesPopup,
    closePopup: closeRepeatExpensesPopup,
  } = usePopup('repeatExpenses');
  const {
    isOpen: isAddMoneyboxPopupOpen,
    openPopup: openAddMoneyboxPopup,
    closePopup: closeAddMoneyboxPopup,
  } = usePopup('addMoneybox');

  const handleRepeatExpensesClick = () => openRepeatExpensesPopup();
  const handleAddMoneyboxClick = () => openAddMoneyboxPopup();

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
