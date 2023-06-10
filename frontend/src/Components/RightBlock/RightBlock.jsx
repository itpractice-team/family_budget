import './RightBlock.scss';
import Moneybox from '../Moneybox/Moneybox';
import Template from '../Template/Template';
import RepeatSpend from '../RepeatSpend/RepeatSpend';

export default function RightBlock({ handleRepeatExpensesClick }) {
  return (
    <section className="right-block">
      <Template title="Повторяющиеся расходы" onClick={handleRepeatExpensesClick}>
        <RepeatSpend />
      </Template>
      <Template title="Конверты на накопления">
        <Moneybox />
      </Template>
    </section>
  );
}
