/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Popup from '../Popup/Popup';
import { changePassword } from '../../store/slices/passwordSlice';
import Loader from '../Loader/Loader';
import Button from '../../ui/Button/Button';
import { togglePasswordChangePopup, toggleInfoPopup } from '../../store/slices/togglePopupSlice';
import { RequirementsPassword } from '../../utils/consts';
import { clearUser } from '../../store/slices/userSlice';
import { setLogin } from '../../store/slices/loginSlice';
import changePasswordValidation from '../../utils/validations/changePasswordValidation';

export default function PasswordChangePopup({ onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.password.loading);

  function handleСancel(evt) {
    evt.preventDefault();
    dispatch(togglePasswordChangePopup(false));
  }

  function handleChangePassword(formData) {
    dispatch(changePassword(formData)).then(() => {
      dispatch(clearUser());
      dispatch(setLogin(false));
      dispatch(toggleInfoPopup(true));
      dispatch(togglePasswordChangePopup(false));
    });
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(changePasswordValidation),
  });

  const newPassword = useRef({});
  newPassword.current = watch('new_password', '');

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
              {...register('current_password')}
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
            <span
              className={`form__valid-message 
                      ${errors.current_password ? 'form__valid-message_active' : ''}`}
            >
              {errors?.current_password && errors?.current_password?.message}
            </span>
          </label>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="PasswordChangePopup-newPassword">
            Новый пароль
            <input
              {...register('new_password')}
              id="PasswordChangePopup-newPassword"
              name="new_password"
              className="form__input form__input_password-new"
              type="password"
              placeholder="Введите новый пароль"
              value={new_password}
              onChange={handleChange}
            />
            <span
              className={`form__valid-message 
                        ${errors.new_password ? 'form__valid-message_active' : ''}`}
            >
              {errors?.new_password && errors?.new_password?.message}
            </span>
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
              {...register('re_new_password')}
              id="PasswordChangePopup-repeatPassword"
              name="re_new_password"
              className="form__input"
              type="password"
              placeholder="Введите новый пароль еще раз"
              value={re_new_password}
              onChange={handleChange}
            />
            <span
              className={`form__valid-message 
                          ${errors.re_new_password ? 'form__valid-message_active' : ''}`}
            >
              {errors?.re_new_password && errors?.re_new_password?.message}
            </span>
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
              disabled={!isValid || !errors}
              variant="primary"
              type="text"
              text="Изменить пароль"
              size="medium"
            />
          )}
        </div>
      </form>
    </Popup>
  );
}
