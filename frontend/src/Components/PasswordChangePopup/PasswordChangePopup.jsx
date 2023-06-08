/* eslint-disable camelcase */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import Popup from '../Popup/Popup';
import { changePassword } from '../../store/slices/passwordSlice';
import Loader from '../Loader/Loader';
import Button from '../../ui/Button/Button';
import { togglePasswordChangePopup, toggleInfoPopup } from '../../store/slices/togglePopupSlice';
import { RequirementsPassword } from '../../utils/consts';
import { clearUser } from '../../store/slices/userSlice';
import { setLogin } from '../../store/slices/loginSlice';

export default function PasswordChangePopup({ onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.password.loading);

  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    re_new_password: '',
  });

  const { current_password, new_password, re_new_password } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(togglePasswordChangePopup(false));
  }

  function handleChangePassword(evt) {
    evt.preventDefault();
    dispatch(changePassword(formData)).then(() => {
      dispatch(clearUser());
      dispatch(setLogin(false));
      dispatch(toggleInfoPopup(true));
      dispatch(togglePasswordChangePopup(false));
    });
  }

  return (
    <Popup
      onClose={onClose}
      popupSize="popup_s"
      title="Изменение пароля"
      subtitle="После изменения пароля, все активные сеансы на всех устройствах, сайтах и приложениях будут автоматически завершены"
    >
      <form className="form" onSubmit={handleChangePassword}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="PasswordChangePopup-oldPassword">
            Текущий пароль
            <input
              id="PasswordChangePopup-oldPassword"
              name="current_password"
              className="form__input"
              type="password"
              placeholder="Введите текущий пароль"
              value={current_password}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={40}
            />
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="PasswordChangePopup-newPassword">
            Новый пароль
            <input
              id="PasswordChangePopup-newPassword"
              name="new_password"
              className="form__input form__input_password-new"
              type="password"
              placeholder="Введите новый пароль"
              value={new_password}
              onChange={handleChange}
            />
          </label>
          <div
            className=" tooltip tooltip-change-password"
            data-tooltip-id="password"
            data-tooltip-content={RequirementsPassword}
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
              placeholder="Введите новый пароль еще раз"
              value={re_new_password}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form__button-wrapper form__button-wrapper_profile">
          <Button
            variant="secondary"
            type="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              variant="primary"
              type="text"
              text="Изменить пароль"
              size="medium"
              onClick={handleChangePassword}
            />
          )}
        </div>
      </form>
    </Popup>
  );
}
