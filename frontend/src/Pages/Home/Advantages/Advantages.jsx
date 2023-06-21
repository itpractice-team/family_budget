import './Advantages.scss';

export default function Advantages({ title, description, icon }) {
  return (
    <li className="advantages">
      <img className="advantages__image" src={icon} alt={title} />
      <h3 className="advantages__text-bold">{title}</h3>
      <p className="advantages__text">{description}</p>
    </li>
  );
}
