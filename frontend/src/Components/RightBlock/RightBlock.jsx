import './RightBlock.scss';
import TemplateRightBlock from '../TemplateRightBlock/TemplateRightBlock';
import moneybox from '../../Images/moneybox.svg';
import moneybag from '../../Images/moneybag.svg';

export default function RightBlock() {
  return (
    <section className="right-block">
      <TemplateRightBlock
        title="Конверты на&nbsp;накопления"
        icon={moneybox}
        subtitle="Отложить деньги на цель для накопления"
      />
      <TemplateRightBlock
        title="Повторяющиеся 
        расходы"
        icon={moneybag}
        subtitle="Занести расходы, которые происходят регулярно"
      />
    </section>
  );
}
