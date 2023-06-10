/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidation from '../../utils/validations/loginValidation';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import Popup from '../Popup/Popup';
import { loginUser } from '../../store/slices/loginSlice';
import Loader from '../Loader/Loader';
import Eye from '../../ui/Eye/Eye';

export default function LoginPopup({ onClose }) {
  const dispatch = useDispatch();

  // Configuration to add Eye component
  const [eyes, setEyes] = useState([false, false, false]);
  const handleEyeChange = (index, opened) => {
    const newEyesValues = [...eyes];
    newEyesValues[index] = opened;
    setEyes(newEyesValues);
  }

  const isLogin = useSelector((state) => state.login.login);
  const isLoading = useSelector((store) => store.login.loading);

  const handleRegistrationClick = () => {
    dispatch(toggleLoginPopup(false));
    dispatch(toggleRegisterPopup(true));
  };

  const handleLogin = (formData) => {
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(toggleLoginPopup(false));
    }
  }, [isLogin, dispatch]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginValidation),
  });

  if (isLogin) {
    return <Navigate to="/budget" />;
  }
  return (
    <Popup onClose={onClose} popupSize="popup_s">
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        <h2 className="form__header">Авторизация</h2>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="LoginPopup-login">
            Логин
            <input
              {...register('username')}
              id="LoginPopup-login"
              name="username"
              className="form__input"
              type="text"
              placeholder="Логин"
            />
            <span
              className={`form__valid-message 
                        ${errors.username ? 'form__valid-message_active' : ''}`}
            >
              {errors?.username && errors?.username?.message}
            </span>
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
              {...register('password')}
              id="LoginPopup-password"
              name="password"
              className="form__input"
              placeholder="Пароль"
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

        <div className="form__button-wrapper form__button-wrapper_single">
          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className={`form__button form__button_submit form__button_single 
          ${(!isValid || !errors) && 'form__button:disabled'}`}
              disabled={!isValid}
            >
              Войти
            </button>
          )}
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
