import './Logo.scss';
import { NavLink } from 'react-router-dom';

export default function Logo({ src }) {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__image" src={src} alt="Логотип" />
      {/* <div className="logo__text-content">
        <h1 className="logo__title">InCoin</h1>
        <p className="logo__subtitle">Отслеживание бюджета</p>
      </div> */}
    </NavLink>
  );
}
