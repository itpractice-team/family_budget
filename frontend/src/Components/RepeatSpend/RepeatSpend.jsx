import moneybag from '../../Images/moneybag.svg';
import PlugRightBlock from '../PlugRightBlock/PlugRightBlock';

export default function RepeatSpend() {
  return (
    <section className="repeatspend">
      <PlugRightBlock icon={moneybag} subtitle="Занести расходы, которые происходят регулярно" />
    </section>
  );
}
