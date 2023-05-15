import { NavLink } from 'react-router-dom';
import './Header.scss';
import Logo from '../Logo/Logo';
import user from '../../Images/user.svg'

// eslint-disable-next-line react/prop-types
export default function Header() {
  return (
    <header className="header">
      <nav className="header__navigation">
        <ul className="header__menu">
          <li>
            <NavLink to='/' className="header__link">
              <Logo />
            </NavLink>
          </li>
          <li>
            <NavLink to='/budget' className="header__link">
              <p>бюджет</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='/statistic' className="header__link">
              <p>статистика</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='/help' className="header__link">
              <p>помощь</p>
            </NavLink>
          </li>
          <li>
            <NavLink to='/profile' className="header__link">
              <button type="button">
              <img src={user} className="" alt="Иконка личного кабинета" />
              </button>
            </NavLink>
          </li>
        </ul>
      </nav >
    </header >
  );
}
