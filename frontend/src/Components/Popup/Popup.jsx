import './Popup.scss';
import { useEffect } from 'react';

function Popup({ isPopupOpen, children, formHeaderText, handleSubmit, closePopup }) {
  const popupClass = isPopupOpen ? 'popup_open' : '';

  useEffect(() => {
    document.addEventListener('keydown', closePopup);

    return () => document.removeEventListener('keydown', closePopup);
  }, []);

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

        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__header">{formHeaderText}</h2>

          {children}

          <div className="form__button-wrapper">
            <button type="reset" className="form__button form__button_reset">
              Отменить
            </button>

            <button type="submit" className="form__button form__button_submit">
              Готово
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Popup;
