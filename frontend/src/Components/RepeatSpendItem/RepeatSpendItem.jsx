import './RepeatSpendItem.scss';

export default function RepeatSpendItem({ title, amount, onClick }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article className="repeat-spend-item" onClick={onClick}>
      <div className="repeat-spend-item__content">
        <p className="repeat-spend-item__name">{title}</p>
        <p className="repeat-spend-item__target">{amount}</p>
      </div>
    </article>
  );
}
