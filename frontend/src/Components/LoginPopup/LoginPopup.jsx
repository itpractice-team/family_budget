import { useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { RegExLogin, RegExPassword } from '../../utils/consts';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import Popup from '../Popup/Popup';

export default function LoginPopup({ onClose }) {
  const dispatch = useDispatch();

  const handleRegistrationClick = () => {
    dispatch(toggleLoginPopup(false));
    dispatch(toggleRegisterPopup(true));
  };

  function handleSubmit(e) {
    e.preventDefault();

    // call serialize & submit functions
  }

  return (
    <Popup onClose={onClose} popupSize="popup_s">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__header">Авторизация</h2>

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

        <div className="form__button-wrapper">
          <button type="submit" className="form__button form__button_submit">
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
