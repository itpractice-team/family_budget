import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import Popup from '../Popup/Popup';
import { registerUser } from '../../store/slices/registerSlice';

export default function RegisterPopup({ onClose }) {
  const dispatch = useDispatch();

  const isRegistration = useSelector((state) => state.registration.data);

  const handleEnterClick = () => {
    dispatch(toggleRegisterPopup(false));
    dispatch(toggleLoginPopup(true));
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
  });

  // eslint-disable-next-line camelcase
  const { username, email, first_name, last_name, password } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleRegistration = (evt) => {
    evt.preventDefault();
    // Проверка на совпадение паролей
    // if (password === formData.confirmPassword) {
    // Отправка данных регистрации пользователя
    // eslint-disable-next-line camelcase
    dispatch(registerUser({ username, email, first_name, last_name, password }));
    if (isRegistration) {
      dispatch(toggleRegisterPopup(false));
      dispatch(toggleLoginPopup(true));
    }
    // } else {
    // Пока такая обработка ошибки при несовпадении паролей
    //   console.log('Пароли не совпадают');
    // }
  };

  return (
    <Popup onClose={onClose} popupSize="popup_m">
      <form className="form" onSubmit={handleRegistration}>
        <h2 className="form__header">Регистрация</h2>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-login">
            Логин
            <input
              id="RegisterPopup-login"
              name="username"
              className="form__input"
              type="text"
              placeholder="Ввести логин"
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
          <label className="form__input-label" htmlFor="RegisterPopup-email">
            E-mail
            <input
              id="RegisterPopup-email"
              name="email"
              className="form__input"
              type="email"
              placeholder="Ввести e-mail"
              value={email}
              onChange={handleChange}
              required
              minLength={7}
              maxLength={129}
            />
          </label>
          <div
            className="form__tooltip"
            data-tooltip-id="email"
            data-tooltip-content="Цифры, латинские буквы, специальные символы: -, _, .,  минимальное количество символов - 7, максимальное - 129"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="email"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-name">
            Имя
            <input
              id="RegisterPopup-name"
              name="first_name"
              className="form__input"
              type="text"
              placeholder="Ввести имя"
              // eslint-disable-next-line camelcase
              value={first_name}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
            />
          </label>
          <div
            className="form__tooltip"
            data-tooltip-id="name"
            data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="name"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-surname">
            Фамилия
            <input
              id="RegisterPopup-surname"
              name="last_name"
              className="form__input"
              type="text"
              placeholder="Ввести фамилию"
              // eslint-disable-next-line camelcase
              value={last_name}
              onChange={handleChange}
              minLength={2}
              maxLength={50}
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-password">
            Пароль
            <input
              id="RegisterPopup-password"
              name="password"
              className="form__input"
              type="password"
              placeholder="Ввести пароль"
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

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-repeatPassword">
            Введите пароль повторно
            <input
              id="RegisterPopup-repeatPassword"
              name="confirmPassword"
              className="form__input"
              type="password"
              placeholder="Повторить пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={40}
            />
          </label>
        </div>

        <label htmlFor="RegisterPopup-confirm" className="form__checkbox-label form__text">
          Я даю своё согласие на обработку персональных данных и ознакомился c
          <NavLink to="/"> Политикой o конфиденциальности </NavLink>
          <input type="checkbox" id="RegisterPopup-confirm" className="form__checkbox" />
        </label>

        <div className="form__button-wrapper">
          <p className="form__text">
            {'У вас уже есть аккаунт? '}
            <button type="button" className="form__button_text" onClick={handleEnterClick}>
              Войти
            </button>
          </p>

          <button type="submit" className="form__button form__button_submit">
            Зарегестрироваться
          </button>
        </div>
      </form>
    </Popup>
  );
}
