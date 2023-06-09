import './MoneyboxItem.scss';

export default function MoneyboxItem({ title, balance, target }) {
  const progress = (balance / target) * 100;
  const isDone = progress >= 100;

  return (
    <article className="moneybox-item">
      <div className="moneybox-item__content">
        <p className="moneybox-item__name">{title}</p>
        <p className="moneybox-item__target">{target}</p>
      </div>
      <div className="progress-bar">
        <div
          className={`progress-bar__fill ${isDone ? 'done' : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </article>
  );
}
