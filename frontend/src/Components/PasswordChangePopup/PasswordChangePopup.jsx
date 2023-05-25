import { Tooltip } from 'react-tooltip';
import { RegExPassword } from '../../utils/consts';

export default function PasswordChangePopup() {
  return (
    <>
      <p className="form__text form__text_explanation">
        После изменения пароля произойдёт выход из аккаунта на всех устройствах, сайтах и
        приложениях, где вошли c текущим паролем
      </p>

      <div className="form__input-block">
        <label className="form__input-label" htmlFor="PasswordChangePopup-oldPassword">
          Текущий пароль
          <input
            className="form__input"
            type="password"
            placeholder="*******"
            id="PasswordChangePopup-oldPassword"
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
        <label className="form__input-label" htmlFor="PasswordChangePopup-newPassword">
          Новый пароль
          <input
            className="form__input"
            type="password"
            placeholder="*******"
            id="PasswordChangePopup-newPassword"
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

      <div className="form__password-reliability-block">
        <div className="form__password-reliability form__password-reliability_ok" />
        <p> Надёжный пароль</p>
      </div>

      <div className="form__input-block">
        <label className="form__input-label" htmlFor="PasswordChangePopup-repeatPassword">
          Новый пароль ещё раз
          <input
            className="form__input"
            type="password"
            placeholder="*******"
            id="PasswordChangePopup-repeatPassword"
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
    </>
  );
}
