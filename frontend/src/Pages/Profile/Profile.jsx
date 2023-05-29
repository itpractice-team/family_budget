import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import './Profile.scss';
import avatar from '../../Images/avatar.svg';
import PasswordChangePopup from '../../Components/PasswordChangePopup/PasswordChangePopup';
import { togglePasswordChangePopup } from '../../store/slices/togglePopupSlice';
import { getUser, updateUser } from '../../store/slices/profileSlice';

export default function Profile() {
  const [disable, setDisable] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const isPasswordChangePopupOpen = useSelector((state) => state.popup.isPasswordChangePopupOpen);
  const userData = useSelector((state) => state.user.user);

  const handlePasswordChangeClick = () => {
    dispatch(togglePasswordChangePopup(true));
  };
  const closePasswordChangePopup = () => {
    dispatch(togglePasswordChangePopup(false));
  };

  const handleEnableInputs = () => {
    setDisable(false);
  };

  const buttonText = disable ? 'Изменить данные' : 'Сохранить данные';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
      });
    }
  }, [userData]);

  // eslint-disable-next-line camelcase
  const { username, email, first_name, last_name } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  function handleUpdateProfile(e) {
    e.preventDefault();
    dispatch(updateUser(formData));
  }

  return (
    <>
      <section className="profile-page">
        <div className="profile">
          <h2 className="profile__title">Настройки профиля</h2>
          <p className="profile__text">Здесь можно менять настройки, как душе угодно</p>
          <form className="profile__data" onSubmit={handleUpdateProfile}>
            <div className="profile__avatar">
              <img src={avatar} alt="Иконка аватара" />
              <div className="profile__avatar-edit">
                <button className="profile__button" type="button">
                  Загрузить новое фото
                </button>
                <span className="avatar-edit__span">
                  Размер изображения не&nbsp;должен превышать 5 мб, формат jpg и png
                </span>
              </div>
            </div>
            <div className="profile__data-list">
              <div className="profile__data-item">
                <label className="profile__data-label" htmlFor="Profile-login">
                  Логин
                  <input
                    id="Profile-login"
                    name="username"
                    className="profile__data-input"
                    type="text"
                    placeholder="Ввести логин"
                    value={username}
                    onChange={handleChange}
                    required
                    maxLength={25}
                    minLength={2}
                    disabled={disable}
                  />
                </label>

                <div
                  // className="form__tooltip"
                  className="profile__tooltip"
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

              <div className="profile__data-item">
                <label className="profile__data-label" htmlFor="Profile-email">
                  E-mail
                  <input
                    id="Profile-email"
                    name="email"
                    className="profile__data-input"
                    type="email"
                    placeholder="Ввести e-mail"
                    value={email}
                    onChange={handleChange}
                    required
                    minLength={7}
                    maxLength={129}
                    disabled={disable}
                  />
                </label>
                <div
                  className="profile__tooltip"
                  data-tooltip-id="email"
                  data-tooltip-content="Цифры, латинские буквы, специальные символы: -, _, .,  минимальное количество символов - 7, максимальное - 129"
                />
                <Tooltip
                  data-tooltip-variant="info"
                  className="react-tooltip"
                  classNameArrow="react-tooltip-arrow"
                  id="email"
                  place="bottom"
                />
              </div>

              <div className="profile__data-item">
                <label className="profile__data-label password" htmlFor="Profile-password">
                  Пароль
                  <input
                    id="Profile-password"
                    className="profile__data-input"
                    type="password"
                    placeholder="*******"
                    required
                    minLength={8}
                    maxLength={40}
                    disabled
                  />
                </label>
                <div
                  className="profile__tooltip"
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
              <div className="profile__data-item">
                <button
                  // className="form__button form__button_change"
                  className="profile__button btn-edit-password"
                  type="button"
                  onClick={handlePasswordChangeClick}
                >
                  Сменить пароль
                </button>
              </div>

              <div className="profile__data-item">
                <label className="profile__data-label" htmlFor="Profile-name">
                  Имя
                  <input
                    id="Profile-name"
                    name="first_name"
                    className="profile__data-input"
                    type="text"
                    placeholder="Ввести имя"
                    // eslint-disable-next-line camelcase
                    value={first_name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={50}
                    disabled={disable}
                  />
                </label>
                <div
                  className="profile__tooltip"
                  data-tooltip-id="name"
                  data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру"
                />
                <Tooltip
                  data-tooltip-variant="info"
                  className="react-tooltip"
                  classNameArrow="react-tooltip-arrow"
                  id="name"
                  place="bottom"
                />
              </div>

              <div className="profile__data-item">
                <label className="profile__data-label" htmlFor="Profile-surname">
                  Фамилия
                  <input
                    id="Profile-surname"
                    name="last_name"
                    className="profile__data-input"
                    type="text"
                    placeholder="Ввести фамилию"
                    // eslint-disable-next-line camelcase
                    value={last_name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={50}
                    disabled={disable}
                  />
                </label>
                <div
                  className="profile__tooltip"
                  data-tooltip-id="surname"
                  data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру"
                />
                <Tooltip
                  data-tooltip-variant="info"
                  className="react-tooltip"
                  classNameArrow="react-tooltip-arrow"
                  id="surname"
                  place="bottom"
                />
              </div>
            </div>
            <div className="profile__data-actions">
              <button
                className="profile__button btn-edit-profile"
                type="submit"
                onClick={handleEnableInputs}
                // eslint-disable-next-line camelcase
                disabled={!disable && !username && !email && !first_name && !last_name}
              >
                {buttonText}
              </button>
              <button className="profile__button btn-delete-profile" type="button">
                Удалить профиль
              </button>
            </div>

            {isPasswordChangePopupOpen && (
              <PasswordChangePopup onClose={closePasswordChangePopup} />
            )}
          </form>
        </div>
      </section>

      {/* <form className="form form_profile" onSubmit={handleSubmit}>
        <div className="form__header-block">
          <h1 className="form__header_profile">Настройки профиля</h1>
          <p className="form__text form__text_profile">
            Здесь можно менять настройки, как душе угодно
          </p>
        </div>

        <div className="form__img-block">
          <img src={avatar} alt="Иконка аватара" className="form__img" />
          <div className="form__image-description">
            <label htmlFor="Profile-img" className="form__button form__button_change">
              <input
                type="file"
                className="form_hidden"
                name="Profile-img"
                accept=".jpg, .jpeg, .png"
                size={5242880}
              />
              <span>Загрузить новое фото</span>
            </label>

            <p className="form__text form__text_explanation">
              Размер изображения не&nbsp;должен превышать 5 мб, формат jpg и png
            </p>
          </div>
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="Profile-login">
            Логин
            <input
              className="form__input"
              type="text"
              placeholder="Ivan Petrov"
              id="Profile-login"
              required
              maxLength={25}
              minLength={2}
              pattern={RegExLogin}
              disabled={disable}
            />
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
          <label className="form__input-label" htmlFor="Profile-email">
            E-mail
            <input
              className="form__input"
              type="email"
              placeholder="example@mail.ru"
              id="Profile-email"
              required
              minLength={7}
              maxLength={129}
              pattern={RegExEmail}
              disabled={disable}
            />
          </label>
          <div
            className="form__tooltip"
            data-tooltip-id="email"
            data-tooltip-content="Цифры, латинские буквы, специальные символы: -, _, .,  минимальное количество символов - 7, максимальное - 129"
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
          <label className="form__input-label" htmlFor="Profile-password">
            Пароль
            <input
              className="form__input"
              type="password"
              placeholder="*******"
              id="Profile-password"
              required
              minLength={8}
              maxLength={40}
              pattern={RegExPassword}
              disabled={disable}
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

        <button
          className="form__button form__button_change"
          type="button"
          onClick={handlePasswordChangeClick}
        >
          Сменить пароль
        </button>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="Profile-name">
            Имя
            <input
              className="form__input"
              type="text"
              placeholder="Иван"
              id="Profile-name"
              minLength={2}
              maxLength={50}
              pattern={RegExName}
              disabled={disable}
            />
          </label>
          <div
            className="form__tooltip"
            data-tooltip-id="name"
            data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру"
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
          <label className="form__input-label" htmlFor="Profile-surname">
            Фамилия
            <input
              className="form__input"
              type="text"
              placeholder="Петров"
              id="Profile-surname"
              minLength={2}
              maxLength={50}
              pattern={RegExSurname}
              disabled={disable}
            />
          </label>
          <div
            className="form__tooltip"
            data-tooltip-id="surname"
            data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="surname"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor="Profile-phone">
            Телефон
            <input
              className="form__input"
              type="tel"
              placeholder="+7 987 654 32 10"
              id="Profile-phone"
              disabled={disable}
              pattern={RegExPhone}
            />
          </label>
          <div
            className="form__tooltip"
            data-tooltip-id="phone"
            data-tooltip-content="Введите телефон"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="phone"
            place="bottom"
          />
        </div>

        <div className="form__input-block">
          <label className="form__input-label" htmlFor='Profile-currency" '>
            Какая основная валюта
            <input className="form__input" type="text" placeholder="Рубли" id="Profile-currency" />
          </label>
          <div
            className="form__tooltip"
            data-tooltip-id="currency"
            data-tooltip-content="Введите название валюты"
          />
          <Tooltip
            data-tooltip-variant="info"
            className="react-tooltip"
            classNameArrow="react-tooltip-arrow"
            id="currency"
            place="bottom"
          />
        </div>

        <div className="form__button-wrapper form__button-wrapper_profile">
          <button className="form__button form__button_submit" type="submit">
            Изменить данные
          </button>
          <button className="form__button" type="button">
            Удалить профиль
          </button>
        </div>

        {isPasswordChangePopupOpen && <PasswordChangePopup onClose={closePasswordChangePopup} />}
      </form> */}
    </>
  );
}
