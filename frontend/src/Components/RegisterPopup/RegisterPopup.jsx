import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Popup from '../Popup/Popup';
import { registerUser } from '../../store/slices/accountSlice';
import registerValidation from '../../utils/validations/registerValidation';
import Loader from '../Loader/Loader';
import Eye from '../../ui/Eye/Eye';
import {
  RequirementsLogin,
  RequirementsEmail,
  RequirementsNameAndSurname,
  RequirementsPassword,
} from '../../utils/consts';
import Button from '../../ui/Button/Button';
import usePopup from '../../utils/hooks/usePopup';

export default function RegisterPopup({ onClose }) {
  const dispatch = useDispatch();

  const { openPopup: openLoginPopup } = usePopup('login');

  // Configuration to add Eye component
  const [eyes, setEyes] = useState([false, false, false]);
  const handleEyeChange = (index, opened) => {
    const newEyesValues = [...eyes];
    newEyesValues[index] = opened;
    setEyes(newEyesValues);
  };

  const { data: isRegistration, loading: isLoading } = useSelector((state) => state.account);

  const handleLoginClick = () => {
    onClose();
    openLoginPopup();
  };

  const handleRegistration = (userData) => {
    dispatch(registerUser(userData));
  };

  if (isRegistration) {
    onClose();
    openLoginPopup();
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerValidation, { criteriaMode: 'all' }),
  });

  const password = useRef({});
  password.current = watch('password', '');

  return (
    <Popup onClose={onClose} popupSize="popup_m" title="Регистрация">
      <form className="form" onSubmit={handleSubmit(handleRegistration)}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-login">
            Логин
            <input
              {...register('username')}
              id="RegisterPopup-login"
              name="username"
              className="form__input"
              type="text"
              placeholder="Введите логин"
            />
            <span
              className={`form__valid-message 
                          ${errors.username ? 'form__valid-message_active' : ''}`}
            >
              {errors?.username && errors?.username?.message}
            </span>
          </label>
          <div
            className="tooltip tooltip-registration"
            data-tooltip-id="login"
            data-tooltip-content={RequirementsLogin}
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
              {...register('email')}
              id="RegisterPopup-email"
              name="email"
              className="form__input"
              type="email"
              placeholder="Введите e-mail"
            />
            <span
              className={`form__valid-message 
                        ${errors.email ? 'form__valid-message_active' : ''}`}
            >
              {errors?.email && errors?.email?.message}
            </span>
          </label>
          <div
            className="tooltip tooltip-registration"
            data-tooltip-id="email"
            data-tooltip-content={RequirementsEmail}
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
              {...register('first_name')}
              id="RegisterPopup-name"
              name="first_name"
              className="form__input"
              type="text"
              placeholder="Введите имя"
            />
            <span
              className={`form__valid-message 
                        ${errors.first_name ? 'form__valid-message_active' : ''}`}
            >
              {errors?.first_name && errors?.first_name?.message}
            </span>
          </label>
          <div
            className="tooltip tooltip-registration"
            data-tooltip-id="name"
            data-tooltip-content={RequirementsNameAndSurname}
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
              {...register('last_name')}
              id="RegisterPopup-surname"
              name="last_name"
              className="form__input"
              type="text"
              placeholder="Введите фамилию"
            />
            <span
              className={`form__valid-message 
                        ${errors.last_name ? 'form__valid-message_active' : ''}`}
            >
              {errors?.last_name && errors?.last_name?.message}
            </span>
          </label>
          <div
            className="tooltip tooltip-registration"
            data-tooltip-id="last-name"
            data-tooltip-content={RequirementsNameAndSurname}
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="last-name"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="RegisterPopup-password">
            Пароль
            <input
              {...register('password')}
              id="RegisterPopup-password"
              name="password"
              className="form__input"
              placeholder="Введите пароль"
              type={eyes[0] ? 'text' : 'password'}
            />
            <Eye index={0} opened={eyes[0]} setOpenState={handleEyeChange} />
            <span
              className={`form__valid-message 
                        ${errors.password ? 'form__valid-message_active' : ''}`}
            >
              {errors?.password && errors?.password?.message}
            </span>
          </label>
          <div
            className="tooltip tooltip-registration"
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
          <label className="form__input-label" htmlFor="RegisterPopup-repeatPassword">
            Введите пароль повторно
            <input
              {...register('confirmPassword')}
              id="RegisterPopup-repeatPassword"
              name="confirmPassword"
              className="form__input"
              placeholder="Повторите пароль"
              type={eyes[1] ? 'text' : 'password'}
            />
            <Eye index={1} opened={eyes[1]} setOpenState={handleEyeChange} />
            <span
              className={`form__valid-message 
                        ${errors.confirmPassword ? 'form__valid-message_active' : ''}`}
            >
              {errors?.confirmPassword && errors?.confirmPassword?.message}
            </span>
          </label>
        </div>

        <label
          htmlFor="RegisterPopup-confirm"
          className="form__checkbox-label form__text_confirm-register"
        >
          Я даю своё согласие на обработку персональных данных и ознакомился c Политикой
          o&nbsp;конфиденциальности
          <input
            {...register('agree')}
            type="checkbox"
            id="RegisterPopup-confirm"
            className="form__checkbox"
          />
        </label>

        <div className="form__button-wrapper">
          <div className="form__button-wrapper-register">
            <p className="form__text">У вас уже есть аккаунт?</p>
            <Button
              variant="fiat"
              content="text"
              text="Войти"
              size="small"
              onClick={handleLoginClick}
            />
          </div>
          {isLoading ? (
            <Loader extraClass="loader-register" />
          ) : (
            <Button
              type="submit"
              variant="primary"
              content="text"
              text="Зарегистрироваться"
              size="large"
              disabled={!isValid}
            />
          )}
        </div>
      </form>
    </Popup>
  );
}
