/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable camelcase */
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../store/slices/loginSlice';
import { resetUser } from '../../store/slices/userSlice';
import './ProfileTooltip.scss';
import Button from '../../ui/Button/Button';
import defaultAvatar from '../../Images/avatar-size-s.svg';

export default function ProfileTooltip({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { avatar, first_name, last_name } = useSelector((state) => state.user.user);
  const tooltipRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetUser());
    onClose();
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={tooltipRef} className={`profile-tooltip ${isOpen ? '' : 'profile-tooltip_hidden'}`}>
      <div className="profile-tooltip__user-data">
        <img
          src={avatar === null ? defaultAvatar : avatar}
          className="profile-tooltip__user-icon"
          alt="Аватар"
        />
        <p className="profile-tooltip__user-name">
          {first_name} {last_name}
        </p>
        <button className="profile-tooltip__btn-exit" type="submit" onClick={handleLogout} />
      </div>
      <NavLink to="/profile" className="profile-tooltip__link">
        <Button
          variant="primary"
          type="text"
          text="Перейти в личный кабинет"
          size="medium"
          onClick={onClose}
        />
      </NavLink>
    </div>
  );
}
