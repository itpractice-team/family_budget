/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import Logo from '../Logo/Logo';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import { logoutUser } from '../../store/slices/loginSlice';

export default function Header() {
  const dispatch = useDispatch();

  const isRegisterPopupOpen = useSelector((state) => state.popup.isRegisterPopupOpen);
  const isLoginPopupOpen = useSelector((state) => state.popup.isLoginPopupOpen);
  const isLogin = useSelector((state) => state.login.login);
  const { avatar } = useSelector((state) => state.login.user);

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

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <header className="header">
      <Logo />
      {!isLogin ? (
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
            <img src={avatar} className="header__profile-icon" alt="Аватар" />
          </NavLink>
          <button className="btn__exit" type="button" onClick={handleLogout} />
        </>
      )}

      {isRegisterPopupOpen && <RegisterPopup onClose={closeRegisterPopup} />}

      {isLoginPopupOpen && <LoginPopup onClose={closeLoginPopup} />}
    </header>
  );
}
