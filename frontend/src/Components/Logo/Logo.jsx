import './Logo.scss';
import { NavLink } from 'react-router-dom';
import logo from '../../Images/logo.svg';

export default function Logo() {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__image" src={logo} alt="Логотип" />
      <h1 className="logo__title">InCoin</h1>
    </NavLink>
  );
}
