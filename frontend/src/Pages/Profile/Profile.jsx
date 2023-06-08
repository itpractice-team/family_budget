/* eslint-disable camelcase */
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import './Profile.scss';
import PasswordChangePopup from '../../Components/PasswordChangePopup/PasswordChangePopup';
import {
  togglePasswordChangePopup,
  toggleAvatarUploaderPopup,
  toggleConfirmationPopup,
} from '../../store/slices/togglePopupSlice';
import { getUser, updateUser } from '../../store/slices/userSlice';
import AvatarUploaderPopup from '../../Components/AvatarUploaderPopup/AvatarUploaderPopup';
import {
  RequirementsLogin,
  RequirementsEmail,
  RequirementsNameAndSurname,
} from '../../utils/consts';
import Button from '../../ui/Button/Button';
import defaultAvatar from '../../Images/avatar.svg';
import ConfirmationPopup from '../../Components/ConfirmationPopup/ConfirmationPopup';

export default function Profile() {
  const dispatch = useDispatch();

  const [disable, setDisable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const isPasswordChangePopupOpen = useSelector((state) => state.popup.isPasswordChangePopupOpen);
  const isAvatarUploaderPopupOpen = useSelector((state) => state.popup.isAvatarUploaderPopupOpen);
  const isConfirmationPopupOpen = useSelector((state) => state.popup.isConfirmationPopupOpen);
  const userData = useSelector((state) => state.user.user);
  const isFetched = useSelector((state) => state.user.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [isFetched]);

  const handleAvatarUploaderClick = (evt) => {
    evt.preventDefault();
    dispatch(toggleAvatarUploaderPopup(true));
  };

  const closeAvatarUploaderPopup = () => {
    dispatch(toggleAvatarUploaderPopup(false));
  };

  const handlePasswordChangeClick = (evt) => {
    evt.preventDefault();
    dispatch(togglePasswordChangePopup(true));
  };
  const closePasswordChangePopup = () => {
    dispatch(togglePasswordChangePopup(false));
  };

  const handleConfirmationPopupClick = (evt) => {
    evt.preventDefault();
    dispatch(toggleConfirmationPopup(true));
  };

  const closeConfirmationPopup = () => {
    dispatch(toggleConfirmationPopup(false));
  };

  const handleEnableInputs = (evt) => {
    evt.preventDefault();
    setDisable(false);
    setIsEditing(true);
  };

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

  const { username, email, first_name, last_name } = formData;

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setIsFormDirty(true);
  };

  function handleUpdateProfile(evt) {
    evt.preventDefault();
    if (isEditing) {
      dispatch(updateUser(formData));
      setDisable(true);
      setIsEditing(false);
      setIsFormDirty(false);
    }
  }

  return (
    <section className="profile-page">
      <div className="profile-settings">
        <h1 className="profile-settings__title">Настройки профиля</h1>
        <div className="profile-settings__avatar-block">
          <img
            src={userData.avatar === null ? defaultAvatar : userData.avatar}
            className="profile-settings__avatar"
            alt="Аватар"
          />
          <Button
            variant="secondary"
            type="text"
            text="Изменить фото"
            size="medium"
            onClick={handleAvatarUploaderClick}
          />
        </div>
        <form className="form form_profile" onSubmit={handleUpdateProfile}>
          <div className="form__input-block">
            <label className="form__input-label" htmlFor="Profile-login">
              Логин
              <input
                id="Profile-login"
                name="username"
                className="form__input"
                type="text"
                placeholder="Введите логин"
                value={username}
                onChange={handleChange}
                disabled={disable}
              />
            </label>
            <div
              className="tooltip tooltip-profile-page"
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
            <label className="form__input-label" htmlFor="Profile-email">
              E-mail
              <input
                id="Profile-email"
                name="email"
                className="form__input"
                type="email"
                placeholder="Введите e-mail"
                value={email}
                onChange={handleChange}
                disabled={disable}
              />
            </label>
            <div
              className="tooltip tooltip-profile-page"
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
            <label className="form__input-label" htmlFor="Profile-password">
              Пароль
              <input
                id="Profile-password"
                className="form__input"
                type="password"
                placeholder="*******"
                disabled
              />
            </label>
          </div>

          <Button
            variant="secondary"
            type="text"
            text="Сменить пароль"
            size="medium"
            extraClass="button__change-password"
            onClick={handlePasswordChangeClick}
          />

          <div className="form__input-block">
            <label className="form__input-label" htmlFor="Profile-name">
              Имя
              <input
                id="Profile-name"
                name="first_name"
                className="form__input"
                type="text"
                placeholder="Введите имя"
                value={first_name}
                onChange={handleChange}
                disabled={disable}
              />
            </label>
            <div
              className="tooltip tooltip-profile-page"
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
            <label className="form__input-label" htmlFor="Profile-surname">
              Фамилия
              <input
                id="Profile-surname"
                name="last_name"
                className="form__input"
                type="text"
                placeholder="Введите фамилию"
                value={last_name}
                onChange={handleChange}
                disabled={disable}
              />
            </label>
            <div
              className="tooltip tooltip-profile-page"
              data-tooltip-id="surname"
              data-tooltip-content={RequirementsNameAndSurname}
            />
            <Tooltip
              data-tooltip-variant="info"
              className="react-tooltip"
              classNameArrow="react-tooltip-arrow"
              id="surname"
              place="bottom"
            />
          </div>

          <div className="form__button-wrapper">
            {!isEditing && (
              <Button
                variant="primary"
                type="text"
                text="Изменить данные"
                size="medium"
                onClick={handleEnableInputs}
                disabled={false}
              />
            )}
            {isEditing && (
              <Button
                variant="primary"
                type="text"
                text="Сохранить данные"
                size="medium"
                onClick={handleUpdateProfile}
                disabled={disable || !isFormDirty}
              />
            )}
            <Button
              variant="fiat"
              type="text"
              text="Удалить профиль"
              size="medium"
              onClick={handleConfirmationPopupClick}
            />
          </div>
          {isAvatarUploaderPopupOpen && <AvatarUploaderPopup onClose={closeAvatarUploaderPopup} />}
          {isPasswordChangePopupOpen && <PasswordChangePopup onClose={closePasswordChangePopup} />}
          {isConfirmationPopupOpen && <ConfirmationPopup onClose={closeConfirmationPopup} />}
        </form>
      </div>
    </section>
  );
}
