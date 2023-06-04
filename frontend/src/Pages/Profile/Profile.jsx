/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
  RequirementsPassword,
  RequirementsNameAndSurname,
} from '../../utils/consts';
import Button from '../../ui/Button/Button';
import defaultAvatar from '../../Images/avatar.svg';
import ConfirmationPopup from '../../Components/ConfirmationPopup/ConfirmationPopup';
import profileValidation from '../../utils/validations/profileValidation';

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

  
  const [disableButton, setDisableButton] = useState(true);
  const [message, setMessage] = useState('');

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

  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   first_name: '',
  //   last_name: '',
  // });

  // useEffect(() => {
  //   if (userData) {
  //     setFormData({
  //       username: userData.username || '',
  //       email: userData.email || '',
  //       first_name: userData.first_name || '',
  //       last_name: userData.last_name || '',
  //     });
  //   }
  // }, [userData]);

  // const { username, email, first_name, last_name } = formData;

  const handleChange = (evt) => {
    // setFormData({ ...formData, [evt.target.name]: evt.target.value });
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

  
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange', 
    defaultValues: {
      username: userData.username || '',
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
    },
    resolver: yupResolver(profileValidation, { criteriaMode: 'all' }),
  });

  /// /// looking for changes ///////////
  useEffect(() => {
    const subscription = watch((value) => {
      if (
        userData.username === value.username && 
        userData.email === value.email &&
        userData.first_name === value.first_name &&
        userData.last_name === value.last_name
        ) {
        setMessage("Необходимо внести изменения");
        setDisableButton(true);
        return;
      } else if (disableButton) {
        setDisableButton(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <section className="profile-page">
      <form className="form form_profile" onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="form__header-block">
          <h1 className="form__header_profile">Настройки профиля</h1>
          <p className="form__text form__text_profile">
            Здесь можно менять настройки, как душе угодно
          </p>
        </div>
        <div className="form__img-block">
          <img
            src={userData.avatar === null ? defaultAvatar : userData.avatar}
            className="form__img"
            alt="Аватар"
          />
          <div className="form__image-description">
            <Button
              variant="secondary"
              type="text"
              text="Изменить фото"
              size="medium"
              extraClass="button__change-avatar"
              onClick={handleAvatarUploaderClick}
            />
            <p className="form__text form__text_explanation">
              Размер изображения не&nbsp;должен превышать 5 мб, формат jpg и png
            </p>
          </div>
        </div>
        <div className="form__input-block">
          <label className="form__input-label" htmlFor="Profile-login">
            Логин
            <input
              id="Profile-login"
              name="username"
              className="form__input"
              type="text"
              placeholder="Ввести логин"
              disabled={disable}
            />
          </label>

          <div
            className="form__tooltip"
            // className="profile__tooltip"
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
              placeholder="Ввести e-mail"
              disabled={disable}
            />
          </label>
          <div
            className="form__tooltip"
            // className="profile__tooltip"
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
          <div
            className="form__tooltip"
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
              placeholder="Ввести имя"
              disabled={disable}
            />
          </label>
          <div
            className="form__tooltip"
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
              placeholder="Ввести фамилию"
              disabled={disable}
            />
          </label>
          <div
            className="form__tooltip"
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

        <div className="form__button-wrapper form__button-wrapper_profile">
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
              // type="text"
              text="Сохранить данные"
              size="medium"
              // onClick={handleUpdateProfile}
              type="submit"
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
    </section>
  );
}
