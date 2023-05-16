import './Popup.scss';
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Popup({ isPopupOpen, children, formHeaderText, handleSubmit }) {
  const [popupClass, setPopupClass] = useState(isPopupOpen ? 'popup_open' : '');

  function closePopup(event) {
    if (
      event.key === 'Escape' ||
      event.target.classList.contains('popup__close') ||
      event.currentTarget === event.target
    ) {
      setPopupClass('');
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closePopup);

    return () => document.removeEventListener('keydown', closePopup);
  }, []);

  return (
    <section
      className={`popup ${popupClass} popup_open`}
      onClick={closePopup}
      onKeyDown={closePopup}
      role="button"
      tabIndex="0"
    >
      <div className="popup__wrapper">
        <button className="popup__close" type="button" aria-label="закрыть" onClick={closePopup} />

        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__header">{formHeaderText}</h2>

          {children}

          <button type="reset" className="form__button form__button_reset">
            Отменить
          </button>

          <button type="submit" className="form__button form__button_submit">
            Готово
          </button>
        </form>
      </div>
    </section>
  );
}

export default Popup;
