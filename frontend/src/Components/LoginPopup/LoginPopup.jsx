import { Tooltip } from 'react-tooltip';
import Popup from '../Popup/Popup';
import { RegExLogin, RegExPassword } from '../../utils/consts';

export default function LoginPopup({ isPopupOpen, closePopup, redirectAuthorizationPopup }) {
  function handleSubmit(e) {
    e.preventDefault();

    // call serialize & submit functions
  }

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      closePopup={closePopup}
      formHeaderText="Авторизация"
      handleSubmit={handleSubmit}
    >
      <div className="form__input-block">
        <label className="form__input-label" htmlFor="LoginPopup-login">
          Логин
          <input
            className="form__input"
            type="text"
            placeholder="Ivan Petrov"
            id="LoginPopup-login"
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
        <label className="form__input-label" htmlFor="LoginPopup-password">
          Пароль
          <input
            className="form__input"
            type="password"
            placeholder="*******"
            id="LoginPopup-password"
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

      <p>
        У вас ещё нет аккаунта?&nbsp;
        <button type="button" onClick={redirectAuthorizationPopup}>
          Зарегистрироваться
        </button>
      </p>
    </Popup>
  );
}
