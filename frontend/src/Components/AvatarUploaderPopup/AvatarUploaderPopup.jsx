/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AvatarUploaderPopup.scss';
import Popup from '../Popup/Popup';
import AvatarUploader from '../AvatarUploader/AvatarUploader';
import Loader from '../Loader/Loader';
import Button from '../../ui/Button/Button';
import { updateUser } from '../../store/slices/userSlice';
import defaultAvatar from '../../Images/avatar.svg';

export default function AvatarUploaderPopup({ onClose }) {
  const dispatch = useDispatch();

  const [recipeFile, setRecipeFile] = useState(null);
  const { avatar } = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.loading);

  function handleChangeAvatar(evt) {
    evt.preventDefault();
    dispatch(updateUser({ avatar: recipeFile }));
  }
  function handleDeleteAvatar(evt) {
    evt.preventDefault();
    dispatch(updateUser({ avatar: '' }));
  }

  return (
    <Popup onClose={onClose} popupSize="popup_s">
      <form className="form form_single" onSubmit={handleChangeAvatar}>
        <h2 className="form__header">Загрузить новое фото</h2>
        <p className="form__text form__text_explanation">
          Размер изображения не должен превышать 5 мб, формат jpg и png
        </p>
        <div className="avatar-actions">
          <AvatarUploader
            defaultImage={avatar === null ? defaultAvatar : avatar}
            onChange={(file) => {
              setRecipeFile(file);
            }}
          />
          <button className="delete-avatar" type="button" onClick={handleDeleteAvatar} />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <Button variant="primary" type="text" text="Cохранить" size="medium" />
        )}
      </form>
    </Popup>
  );
}
