import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import Popup from '../Popup/Popup';
import { loginUser } from '../../store/slices/loginSlice';

export default function LoginPopup({ onClose }) {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.login.login);

  const handleRegistrationClick = () => {
    dispatch(toggleLoginPopup(false));
    dispatch(toggleRegisterPopup(true));
  };

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // eslint-disable-next-line camelcase
  const { username, password } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(toggleLoginPopup(false));
    }
  }, [isLogin, dispatch]);

  if (isLogin) {
    return <Navigate to="/budget" />;
  }

  return (
    <Popup onClose={onClose} popupSize="popup_s">
      <form className="form" onSubmit={handleLogin}>
        <h2 className="form__header">Авторизация</h2>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="LoginPopup-login">
            Логин
            <input
              id="LoginPopup-login"
              name="username"
              className="form__input"
              type="text"
              placeholder="Логин"
              value={username}
              onChange={handleChange}
              required
              maxLength={25}
              minLength={2}
            />
          </label>

          <div
            className="form__tooltip"
            data-tooltip-id="login"
            data-tooltip-content="Прописные и строчные латинские буквы, цифры, _, ., +, -, без пробелов, минимальное количество символов - 2, максимальное - 25"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="login"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="LoginPopup-password">
            Пароль
            <input
              id="LoginPopup-password"
              name="password"
              className="form__input"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={40}
            />
          </label>
          <div
            className="form__tooltip"
            data-tooltip-id="password"
            data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="password"
            place="bottom"
          />
        </div>

        <div className="form__button-wrapper form__button-wrapper_single">
          <button type="submit" className="form__button form__button_submit form__button_single">
            Войти
          </button>

          <div>
            <p className="form__text">У вас ещё нет аккаунта? </p>
            <button type="button" className="form__button_text" onClick={handleRegistrationClick}>
              Зарегистрироваться
            </button>
          </div>
        </div>
      </form>
    </Popup>
  );
}
