/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/rules-of-hooks */
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginValidation from '../../utils/validations/loginValidation';
import { toggleRegisterPopup, toggleLoginPopup } from '../../store/slices/togglePopupSlice';
import Popup from '../Popup/Popup';
import { loginUser } from '../../store/slices/loginSlice';

export default function LoginPopup({ onClose }) {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.login.data);

  const handleRegistrationClick = () => {
    dispatch(toggleLoginPopup(false));
    dispatch(toggleRegisterPopup(true));
  };

  // const [formData, setFormData] = useState({
  //   username: '',
  //   password: '',
  // });

  // eslint-disable-next-line camelcase
  // const { username, password } = formData;

  // const handleChange = (evt) => {
  //   setFormData({ ...formData, [evt.target.name]: evt.target.value });
  // };

  const handleLogin = (formData) => {
    // evt.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(toggleLoginPopup(false));
    }
  }, [isLogin, dispatch]);

  if (isLogin) {
    return <Navigate to="/budget" />;
  }
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginValidation),
  });

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
              // value={username}
              // onChange={handleChange}
              // required
              // maxLength={25}
              // minLength={2}
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
              type="password"
              placeholder="Пароль"
              // value={password}
              // onChange={handleChange}
              // required
              // minLength={8}
              // maxLength={40}

            />
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
          <button type="submit" className={`form__button form__button_submit form__button_single 
          ${(!isValid || !errors) && 'form__button:disabled'}`}
          >
            Войти
          </button>

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
