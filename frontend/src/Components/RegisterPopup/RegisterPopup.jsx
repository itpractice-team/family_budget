import { Tooltip } from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import Popup from '../Popup/Popup';
import { RegExLogin, RegExEmail, RegExName, RegExSurname, RegExPassword } from '../../utils/consts';

export default function RegisterPopup({ isPopupOpen, closePopup, redirectAuthorizationPopup }) {
  function handleSubmit(e) {
    e.preventDefault();

    // call serialize & submit functions
  }

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      formHeaderText="Регистрация"
      handleSubmit={handleSubmit}
    >
      <div className="form__input-block">
        <label className="form__input-label" htmlFor="RegisterPopup-login">
          Логин
          <input
            className="form__input"
            type="text"
            placeholder="Ivan Petrov"
            id="RegisterPopup-login"
            required
            maxLength={25}
            minLength={2}
            pattern={RegExLogin}
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
            className="form__input"
            type="email"
            placeholder="example@mail.ru"
            id="RegisterPopup-email"
            required
            minLength={7}
            maxLength={129}
            pattern={RegExEmail}
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
            className="form__input"
            type="text"
            placeholder="Иван"
            id="RegisterPopup-name"
            minLength={2}
            maxLength={50}
            pattern={RegExName}
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
            className="form__input"
            type="text"
            placeholder="Петров"
            id="RegisterPopup-surname"
            minLength={2}
            maxLength={50}
            pattern={RegExSurname}
          />
        </label>
      </div>

      <div className="form__input-block">
        <label className="form__input-label" htmlFor="RegisterPopup-password">
          Пароль
          <input
            className="form__input"
            type="password"
            placeholder="*******"
            id="RegisterPopup-password"
            required
            minLength={8}
            maxLength={40}
            pattern={RegExPassword}
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
            className="form__input"
            type="password"
            placeholder="*******"
            id="RegisterPopup-repeatPassword"
            required
            minLength={8}
            maxLength={40}
            pattern={RegExPassword}
          />
        </label>
      </div>

      <label htmlFor="RegisterPopup-confirm" className="form__checkbox-label form__text">
        Я даю своё согласие на обработку персональных данных и ознакомился c
        <NavLink to="/"> Политикой o конфиденциальности </NavLink>
        <input type="checkbox" id="RegisterPopup-confirm" className="form__checkbox" />
      </label>

      <p>
        У вас уже есть аккаунт?&nbsp;
        <button type="button" onClick={redirectAuthorizationPopup}>
          Войти
        </button>
      </p>
    </Popup>
  );
}
