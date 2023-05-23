/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import './Popup.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { togglePopup } from '../../store/slices/popupSlice';

function Popup({ children }) {
  // function Popup({ isPopupOpen, children, formHeaderText, handleSubmit }) {
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.togglePopup); 
  const [popupClass, setPopupClass] = useState('');
  function closePopup(event) {
    if (
      event.key === 'Escape' ||
      event.target.classList.contains('popup__close') ||
      event.currentTarget === event.target
    ) {
      setPopupClass('');
      dispatch(togglePopup());
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closePopup);
    return () => document.removeEventListener('keydown', closePopup);
  }, []);
  useEffect(()=>{
    setPopupClass(isPopupOpen ? 'popup_open': '');
  }, [isPopupOpen]);

  return (
    <section
      className={`popup ${popupClass}`}
      onClick={closePopup}
      onKeyDown={closePopup}
      role="button"
      tabIndex="0"
    >
      <div className="popup__wrapper">
        <button className="popup__close" type="button" aria-label="закрыть" onClick={closePopup} />

        {/* <form className="form" onSubmit={handleSubmit}> */}
        {/* <form className="form" onSubmit={handleSubmit}> */}
        {/* <h2 className="form__header">{formHeaderText}</h2> */}

        {children}

        {/* <button type="reset" className="form__button form__button_reset">
            Отменить
          </button>

          <button type="submit" className="form__button form__button_submit">
            Готово
          </button> */}
        {/* </form> */}
      </div>
    </section>
  );
}
Popup.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Popup;
