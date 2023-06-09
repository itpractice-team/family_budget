import './Moneybox.scss';
import MoneyboxItem from '../MoneyboxItem/MoneyboxItem';
import moneybox from '../../Images/moneybox.svg';
import PlugRightBlock from '../PlugRightBlock/PlugRightBlock';

export default function Moneybox() {
  return (
    <section className="moneybox">
      <MoneyboxItem title="На отпуск" balance={20000} target={50000} />
      <MoneyboxItem title="На cпонсирование космонавтики" balance={3000} target={3000} />
    </section>
  );
}

<PlugRightBlock icon={moneybox} subtitle="Отложить деньги на цель для накопления" />;
