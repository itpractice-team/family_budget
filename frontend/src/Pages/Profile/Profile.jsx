/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './Profile.scss';
import PasswordChangePopup from '../../Components/PasswordChangePopup/PasswordChangePopup';
import {
  togglePasswordChangePopup,
  toggleAvatarUploaderPopup,
  toggleConfirmationPopup,
  toggleInfoPopup,
} from '../../store/slices/togglePopupSlice';
import { getUser, updateUser } from '../../store/slices/userSlice';
import AvatarUploaderPopup from '../../Components/AvatarUploaderPopup/AvatarUploaderPopup';
import {
  RequirementsLogin,
  RequirementsEmail,
  RequirementsNameAndSurname,
} from '../../utils/consts';
import Button from '../../ui/Button/Button';
import Footer from '../../Components/Footer/Footer';
import defaultAvatar from '../../Images/profile-default-avatar.svg';
import ConfirmationPopup from '../../Components/ConfirmationPopup/ConfirmationPopup';
import profileValidation from '../../utils/validations/profileValidation';
import InfoPopup from '../../Components/InfoPopup/InfoPopup';
import ErrorNotification from '../../Components/ErrorNotification/ErrorNotification';

export default function Profile() {
  const dispatch = useDispatch();

  const [disable, setDisable] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const {
    isPasswordChangePopupOpen,
    isAvatarUploaderPopupOpen,
    isConfirmationPopupOpen,
    isInfoPopupOpen,
  } = useSelector((state) => state.popup);
  const { user: userData, isFetched } = useSelector((state) => state.user);

  const [disableButton, setDisableButton] = useState(true);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [isFetched]);

  const handleAvatarUploaderClick = useCallback(
    (evt) => {
      evt.preventDefault();
      dispatch(toggleAvatarUploaderPopup(true));
    },
    [dispatch],
  );

  const handlePasswordChangeClick = (evt) => {
    evt.preventDefault();
    dispatch(togglePasswordChangePopup(true));
  };

  const handleDeleteProfileClick = (evt) => {
    evt.preventDefault();
    dispatch(toggleConfirmationPopup(true));
  };

  const closeAvatarUploaderPopup = () => dispatch(toggleAvatarUploaderPopup(false));
  const closePasswordChangePopup = () => dispatch(togglePasswordChangePopup(false));
  const closeConfirmationPopup = () => dispatch(toggleConfirmationPopup(false));
  const closeInfoPopup = () => dispatch(toggleInfoPopup(false));

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValue: userData,
    resolver: yupResolver(profileValidation),
  });

  /// /// default values ///////////
  useEffect(() => {
    if (userData) {
      setValue('username', userData.username || '');
      setValue('email', userData.email || '');
      setValue('first_name', userData.first_name || '');
      setValue('last_name', userData.last_name || '');
    }
  }, [userData, setValue]);

  const watchedValues = useWatch({ control });
  useEffect(() => {
    // Проверка изменений полей
    if (
      userData.username === watchedValues.username &&
      userData.email === watchedValues.email &&
      userData.first_name === watchedValues.first_name &&
      userData.last_name === watchedValues.last_name
    ) {
      setMessage('Для сохранения необходимо внести изменения');
      setDisableButton(true);
    } else {
      setMessage('');
      setDisableButton(false);
    }
  }, [userData, watchedValues]);

  const handleEnableInputs = (evt) => {
    evt.preventDefault();
    setDisable(false);
    setIsEditing(true);
  };

  function handleUpdateProfile(formData) {
    if (isEditing) {
      dispatch(updateUser(formData));
      setDisable(true);
      setIsEditing(false);
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
            content="text"
            text="Изменить фото"
            size="medium"
            onClick={handleAvatarUploaderClick}
          />
        </div>
        <form className="form form_profile" onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="form__input-block">
            <label className="form__input-label" htmlFor="Profile-login">
              Логин
              <input
                {...register('username', {
                  value: userData.username || '',
                  shouldUnregister: true,
                })}
                id="Profile-login"
                name="username"
                className={`form__input ${errors.username ? 'error' : ''}`}
                type="text"
                placeholder="Введите логин"
                disabled={disable}
              />
              <span
                className={`form__valid-message 
                          ${errors.username ? 'form__valid-message_active' : ''}`}
              >
                {errors?.username && errors?.username?.message}
              </span>
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
                {...register('email', { value: userData.email || '', shouldUnregister: true })}
                id="Profile-email"
                name="email"
                className={`form__input ${errors.email ? 'error' : ''}`}
                type="email"
                placeholder="Введите e-mail"
                disabled={disable}
              />
              <span
                className={`form__valid-message 
                        ${errors.email ? 'form__valid-message_active' : ''}`}
              >
                {errors?.email && errors?.email?.message}
              </span>
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
            content="text"
            text="Сменить пароль"
            size="medium"
            extraClass="button__change-password"
            onClick={handlePasswordChangeClick}
          />

          <div className="form__input-block">
            <label className="form__input-label" htmlFor="Profile-name">
              Имя
              <input
                {...register('first_name', {
                  value: userData.first_name || '',
                  shouldUnregister: true,
                })}
                id="Profile-name"
                name="first_name"
                className={`form__input ${errors.first_name ? 'error' : ''}`}
                type="text"
                placeholder="Введите имя"
                disabled={disable}
              />
              <span
                className={`form__valid-message 
                        ${errors.first_name ? 'form__valid-message_active' : ''}`}
              >
                {errors?.first_name && errors?.first_name?.message}
              </span>
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
                {...register('last_name', {
                  value: userData.last_name || '',
                  shouldUnregister: true,
                })}
                id="Profile-surname"
                name="last_name"
                className={`form__input ${errors.last_name ? 'error' : ''}`}
                type="text"
                placeholder="Введите фамилию"
                disabled={disable}
              />
              <span
                className={`form__valid-message 
                        ${errors.last_name ? 'form__valid-message_active' : ''}`}
              >
                {errors?.last_name && errors?.last_name?.message}
              </span>
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
            {!isEditing ? (
              <Button
                variant="primary"
                content="text"
                text="Изменить данные"
                size="medium"
                onClick={handleEnableInputs}
              />
            ) : (
              <Button
                disabled={!isValid || disableButton}
                type="submit"
                variant="primary"
                content="text"
                text="Сохранить данные"
                size="medium"
              />
            )}
            <Button
              variant="fiat"
              content="text"
              text="Удалить профиль"
              size="medium"
              onClick={handleDeleteProfileClick}
            />
            {isEditing && message && <span className="profile__error-message">{message}</span>}
          </div>
        </form>
      </div>
      {isAvatarUploaderPopupOpen && <AvatarUploaderPopup onClose={closeAvatarUploaderPopup} />}
      {isPasswordChangePopupOpen && <PasswordChangePopup onClose={closePasswordChangePopup} />}
      {isConfirmationPopupOpen && <ConfirmationPopup onClose={closeConfirmationPopup} />}
      {isInfoPopupOpen && (
        <InfoPopup
          onClose={closeInfoPopup}
          content={<ErrorNotification />}
          title="Ошибка"
          subtitle="Что-то пошло не так"
        />
      )}
      <Footer extraClass="footer-absolute" />
    </section>
  );
}
