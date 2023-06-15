/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './MoneyboxItem.scss';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function MoneyboxItem({ title, target, balance, onClick }) {
  return (
    <article className="moneybox-item" onClick={onClick}>
      <div className="moneybox-item__content">
        <p className="moneybox-item__name">{title}</p>
        <p className="moneybox-item__target">{target}</p>
      </div>
      <ProgressBar balance={balance} target={target} />
    </article>
  );
}
