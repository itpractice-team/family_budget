/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidation from '../../utils/validations/loginValidation';

function LoginForm({onLogin}) {
  const [message, setMessage] = useState('');
  const [formDIsable, setFormDisable] = useState(true);

  const onSubmit = (loginData) => {
    if (!loginData.email || !loginData.password) {
      setFormDisable(true);
      return setMessage('Email или пароль не верные!');
    }
    setFormDisable(false);
    onLogin(loginData);
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginValidation),
  });

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="login-form__greeting">Авторизация</h2>
      <div className="login-form__input-box">
        <input
          {...register('loginOrEmail')}
          className="login-form__input"
          disabled={formDIsable}
          id="login-email"
          placeholder="Логин или e-mail"
        />
        <span
          className={`login-form__valid-error 
                        ${errors.email ? 'login-form__valid-error_active' : ''}`}
        >
          {errors?.loginOrEmail && errors?.loginOrEmail?.message}
        </span>
      </div>
      <div className="login-form__input-box">
        <input
          {...register('password')}
          type="password"
          className="login-form__input"
          disabled={formDIsable}
          id="login-password"
          placeholder="Пароль"
        />
        <span
          className={`login-form__valid-error 
                        ${errors.password ? 'login-form__valid-error_active' : ''}`}
        >
          {errors?.password && errors?.password?.message}
        </span>

        <span className="login-form__compare-message">{message}</span>
      </div>

      <button
        className={`login-form__button ${
          (!isValid || formDIsable) && 'login-form__button_disabled'
        }`}
        disabled={!isValid || formDIsable}
        type="submit"
        aria-label="Кнопка авторизации"
      >
        <p className="login-form__button_label">Войти</p>
      </button>
      <div className="login-form__label">
        <p>У вас ещё нет аккаунта?&nbsp;</p>
        <NavLink to="/signup" className="login-form__login-link">
          Регистрация
        </NavLink>
      </div>
    </form>
  );
}

export default LoginForm;
