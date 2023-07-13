import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LoginPopup.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidation from '../../utils/validations/loginValidation';
import Popup from '../Popup/Popup';
import { loginUser } from '../../store/slices/authSlice';
import Loader from '../Loader/Loader';
import Button from '../../ui/Button/Button';
import Eye from '../../ui/Eye/Eye';
import usePopup from '../../utils/hooks/usePopup';

export default function LoginPopup({ onClose }) {
  const dispatch = useDispatch();

  const { openPopup: openRegisterPopup } = usePopup('register');

  // Configuration to add Eye component
  const [eyes, setEyes] = useState([false, false, false]);
  const handleEyeChange = (index, opened) => {
    const newEyesValues = [...eyes];
    newEyesValues[index] = opened;
    setEyes(newEyesValues);
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((store) => store.auth.loading);

  const handleRegistrationClick = () => {
    onClose();
    openRegisterPopup();
  };

  const handleLogin = (formData) => {
    formData.username = formData.username.trim();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, dispatch]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginValidation),
  });

  const onBlur = (evt) =>{
    const fieldName = evt.target.name;
    const trimmedValue = evt.target.value.trim();
    setValue(fieldName, trimmedValue);
  }

  if (isAuthenticated) {
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
              onBlur={onBlur}
              id="LoginPopup-login"
              name="username"
              className={`form__input ${errors.username ? 'error' : ''}`}
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
              className={`form__input ${errors.password ? 'error' : ''}`}
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
        </div>

        <div className="form__button-wrapper form__button-wrapper_single">
          {isLoading ? (
            <Loader extraClass="loader-login" />
          ) : (
            <Button
              type="submit"
              variant="primary"
              content="text"
              text="Войти"
              size="large"
              extraClass="button_single"
              disabled={!isValid}
            />
          )}
          <div className="form__button-wrapper-login">
            <p className="form__text">У вас ещё нет аккаунта?</p>
            <Button
              variant="fiat"
              content="text"
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
