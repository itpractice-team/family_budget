import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import Popup from '../Popup/Popup';
import Logo from '../Logo/Logo';
import user from '../../Images/user.svg';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  const isRegisterPopupOpen = useSelector((state) => state.popup.isRegisterPopupOpen);
  const isLoginPopupOpen = useSelector((state) => state.popup.isLoginPopupOpen);

  const handleRegisterClick = () => {
    dispatch(toggleRegisterPopup(true));
  };
  const handleLoginClick = () => {
    dispatch(toggleLoginPopup(true));
  };

  const closeRegisterPopup = () => {
    dispatch(toggleRegisterPopup(false));
  };
  const closeLoginPopup = () => {
    dispatch(toggleLoginPopup(false));
  };

  return (
    <header className="header">
      <Logo />
      {location.pathname === '/' ? (
        <nav className="header__home-menu">
          <div className="header__home-links">
            <button type="button" className="header__home-link">
              Преимущества
            </button>
            <button type="button" className="header__home-link">
              Как это работает?
            </button>
            <button type="button" className="header__home-link">
              Новости
            </button>
          </div>
          <div className="header__buttons">
            <button type="button" className="header__button-login" onClick={handleLoginClick}>
              Войти
            </button>
            <button
              type="button"
              className="header__button-registration"
              onClick={handleRegisterClick}
            >
              Регистрация
            </button>
          </div>
        </nav>
      ) : (
        <>
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li>
                <NavLink to="/budget" className="header__menu-link">
                  <p>Бюджет</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/statistic" className="header__menu-link">
                  <p>Статистика</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/help" className="header__menu-link">
                  <p>Помощь</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          <NavLink to="/profile" className="header__profile-link">
            <img src={user} className="header__profile-icon" alt="Иконка личного кабинета" />
          </NavLink>
        </>
      )}

      {isRegisterPopupOpen && <RegisterPopup onClose={closeRegisterPopup} />}

      {isLoginPopupOpen && (
        <Popup onClose={closeLoginPopup}>
          <LoginPopup />
        </Popup>
      )}
    </header>
  );
}
