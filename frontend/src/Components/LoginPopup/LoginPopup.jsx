/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidation from '../../utils/validations/loginValidation';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import Popup from '../Popup/Popup';
import { loginUser } from '../../store/slices/loginSlice';
import Loader from '../Loader/Loader';
import Button from '../../ui/Button/Button';

export default function LoginPopup({ onClose }) {
  const dispatch = useDispatch();

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
    <Popup onClose={onClose} popupSize="popup_s" title="Авторизация">
      <form className="form" onSubmit={handleSubmit(handleLogin)}>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="LoginPopup-login">
            Логин
            <input
              {...register('username')}
              id="LoginPopup-login"
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
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="LoginPopup-password">
            Пароль
            <input
              {...register('password')}
              id="LoginPopup-password"
              name="password"
              className="form__input"
              type="password"
              placeholder="Введите пароль"
            />
            <span
              className={`form__valid-message 
                        ${errors.password ? 'form__valid-message_active' : ''}`}
            >
              {errors?.password && errors?.password?.message}
            </span>
          </label>
        </div>

        <div className="form__button-wrapper form__button-wrapper_single">
          {isLoading ? (
            <Loader extraClass="loader-login" />
          ) : (
            <Button
              variant="primary"
              type="text"
              text="Войти"
              size="large"
              extraClass="form__button_single"
              disabled={!isValid}
            />
          )}
          <div className="form__button-wrapper-login">
            <p className="form__text">У вас ещё нет аккаунта?</p>
            <Button
              variant="fiat"
              type="text"
              text="Зарегистрироваться"
              size="small"
              onClick={handleRegistrationClick}
            />
          </div>
        </div>
      </form>
    </Popup>
  );
}
