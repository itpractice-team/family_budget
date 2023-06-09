import './Moneybox.scss';
import MoneyboxItem from '../MoneyboxItem/MoneyboxItem';
import moneybox from '../../Images/moneybox.svg';
import PlugRightBlock from '../PlugRightBlock/PlugRightBlock';

export default function Moneybox() {
  return (
    <section className="moneybox">
      <MoneyboxItem />
    </section>
  );
}

<PlugRightBlock icon={moneybox} subtitle="Отложить деньги на цель для накопления" />;
