import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useRef, useState } from 'react';
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
import Eye from '../../ui/Eye/Eye';

export default function PasswordChangePopup({ onClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.password.loading);

  // Configuration to add Eye component
  const [eyes, setEyes] = useState([false, false, false]);
  const handleEyeChange = (index, opened) => {
    const newEyesValues = [...eyes];
    newEyesValues[index] = opened;
    setEyes(newEyesValues);
  };

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
      popupSize="popup_password"
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
              className={`form__input ${errors.current_password ? 'error' : ''}`}
              placeholder="Введите текущий пароль"
              type={eyes[0] ? 'text' : 'password'}
            />
            <Eye index={0} opened={eyes[0]} setOpenState={handleEyeChange} />
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
              className={`form__input form__input_password-new ${
                errors.new_password ? 'error' : ''
              }`}
              placeholder="Введите новый пароль"
              type={eyes[1] ? 'text' : 'password'}
            />
            <Eye
              index={1}
              opened={eyes[1]}
              setOpenState={handleEyeChange}
              extraClass="eye_password-new"
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

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="PasswordChangePopup-repeatPassword">
            Новый пароль ещё раз
            <input
              {...register('re_new_password')}
              id="PasswordChangePopup-repeatPassword"
              name="re_new_password"
              className={`form__input ${errors.re_new_password ? 'error' : ''}`}
              placeholder="Введите новый пароль еще раз"
              type={eyes[2] ? 'text' : 'password'}
            />
            <Eye index={2} opened={eyes[2]} setOpenState={handleEyeChange} />
            <span
              className={`form__valid-message 
                          ${errors.re_new_password ? 'form__valid-message_active' : ''}`}
            >
              {errors?.re_new_password && errors?.re_new_password?.message}
            </span>
          </label>
        </div>

        <div className="form__button-wrapper form__button-wrapper_password-new">
          <Button
            variant="secondary"
            content="text"
            text="Отменить"
            size="medium"
            onClick={handleСancel}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              disabled={!isValid || !errors}
              type="submit"
              variant="primary"
              content="text"
              text="Изменить пароль"
              size="medium"
            />
          )}
        </div>
      </form>
    </Popup>
  );
}
