import './SpendingList.scss';
import SpendingCard from '../Card/Card';

export default function SpendingList({ date, cards, weekDay }) {
  return (
    <div className="spending-list__wrapper">
      <div>
        <h3 className="spending-list__header">{date}</h3>
        <p className="spending-list__text">{weekDay}</p>
      </div>

      <ul className="spending-list__list">
        {cards &&
          cards.map((card) => {
            return <SpendingCard {...card} key={card.id} />;
          })}
      </ul>
    </div>
  );
}
