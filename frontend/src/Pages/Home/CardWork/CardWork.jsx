import './CardWork.scss';

export default function CardWork({ title, description, img, number }) {
  return (
    <li className="list-card">
      <img src={img} alt={title} className="list-card__img" />
      <p className="list-card__number">{number}</p>
      <div className="list-card__text-block">
        <h3 className="list-card__title">{title}</h3>
        <p className="list-card__description">{description}</p>
      </div>
    </li>
  );
}
