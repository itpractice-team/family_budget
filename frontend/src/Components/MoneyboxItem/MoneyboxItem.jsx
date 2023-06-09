import './MoneyboxItem.scss';

export default function MoneyboxItem() {
  const progress = 44;
  return (
    <article className="moneybox-item">
      <div className="moneybox-item__content">
        <p className="moneybox-item__name">На отпуск</p>
        <p className="moneybox-item__target">50000</p>
      </div>
      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
      </div>
    </article>
  );
}
