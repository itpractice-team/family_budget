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
    <Popup
      onClose={onClose}
      popupSize="popup_avatar"
      title="Загрузить новое фото"
      subtitle="Размер файла не может превышать 5 МБ и требуется использовать форматы JPG/JPEG или PNG"
    >
      <form className="form_single" onSubmit={handleChangeAvatar}>
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
          <Loader extraClass="loader-avatar" />
        ) : (
          <Button
            variant="primary"
            type="text"
            text="Cохранить"
            size="medium"
            extraClass="button__save-avatar"
          />
        )}
      </form>
    </Popup>
  );
}
