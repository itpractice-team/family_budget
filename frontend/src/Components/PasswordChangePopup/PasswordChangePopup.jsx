import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Popup from '../Popup/Popup';
import { changePassword } from '../../store/slices/passwordSlice';
// import { logoutUser } from '../../store/slices/loginSlice';
import Loader from '../Loader/Loader';

export default function PasswordChangePopup({ onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.password.loading);
  // const isSuccess = useSelector((store) => store.password.data);

  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    re_new_password: '',
  });

  // eslint-disable-next-line camelcase
  const { current_password, new_password, re_new_password } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  function handleChangePassword(evt) {
    evt.preventDefault();
    dispatch(changePassword(formData));
    // if (isSuccess) {
    //   dispatch(logoutUser());
    // }
  }

  return (
    <Popup onClose={onClose} popupSize="popup_s">
      <form className="form" onSubmit={handleChangePassword}>
        <h2 className="form__header">Изменение пароля </h2>

        <p className="form__text form__text_explanation">
          После изменения пароля произойдёт выход из аккаунта на всех устройствах, сайтах и
          приложениях, где вошли c текущим паролем
        </p>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="PasswordChangePopup-oldPassword">
            Текущий пароль
            <input
              id="PasswordChangePopup-oldPassword"
              name="current_password"
              className="form__input"
              type="password"
              placeholder="Ввести текущий пароль"
              // eslint-disable-next-line camelcase
              value={current_password}
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
          <label className="form__input-label" htmlFor="PasswordChangePopup-newPassword">
            Новый пароль
            <input
              id="PasswordChangePopup-newPassword"
              name="new_password"
              className="form__input"
              type="password"
              placeholder="Ввести новый пароль"
              // eslint-disable-next-line camelcase
              value={new_password}
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

        <div className="form__password-reliability-block">
          <div className="form__password-reliability form__password-reliability_ok" />
          <p> Надёжный пароль</p>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="PasswordChangePopup-repeatPassword">
            Новый пароль ещё раз
            <input
              id="PasswordChangePopup-repeatPassword"
              name="re_new_password"
              className="form__input"
              type="password"
              placeholder="Ввести новый пароль еще раз"
              // eslint-disable-next-line camelcase
              value={re_new_password}
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

        <div className="form__button-wrapper">
          <button type="reset" className="form__button form__button_reset">
            Отменить
          </button>
          {isLoading ? (
            <Loader />
          ) : (
            <button type="submit" className="form__button form__button_submit">
              Изменить пароль
            </button>
          )}
        </div>
      </form>
    </Popup>
  );
}
