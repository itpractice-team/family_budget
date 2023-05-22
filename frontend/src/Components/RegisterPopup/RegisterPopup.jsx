import { Tooltip } from 'react-tooltip';
import Popup from '../Popup/Popup';

export default function RegisterPopup({ isPopupOpen, closePopup }) {
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
            max={25}
            min={2}
            pattern={/[\da-zA-Zа-яА-ЯЁё/_.+-]+/gi}
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
            min={7}
            max={129}
            pattern={/[\da-zA-Z_.-]+/gi}
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
            min={2}
            max={50}
            pattern={/[^\d!@#$%|^&*\\\/()_+\n\t]+/gi}
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
            min={2}
            max={50}
            pattern={/[^\d!@#$%|^&*\\\/()_+\n\t]+/gi}
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
            min={8}
            max={40}
            pattern={/[\da-zA-Z_ .!"#$%&,-]+/gi}
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
        <label className="form__input-label" htmlFor="RegisterPopup-password">
          Введите пароль повторно
          <input
            className="form__input"
            type="password"
            placeholder="*******"
            id="RegisterPopup-password"
            required
            min={8}
            max={40}
            pattern={/[\da-zA-Z_ .!"#$%&,-]+/gi}
          />
        </label>
      </div>

      <label htmlFor="RegisterPopup-confirm">
        Я даю своё согласие на обработку персональных данных и ознакомился с Политикой о
        конфиденциальности
        <input type="checkbox" id="RegisterPopup-confirm" />
        <p>У вас уже есть аккаунт?</p>
      </label>
    </Popup>
  );
}
