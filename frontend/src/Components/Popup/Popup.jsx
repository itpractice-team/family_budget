import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './Popup.scss';
import PopupOverlay from '../PopupOverlay/PopupOverlay';

export default function Popup({ children, onClose, popupSize }) {
  const navigate = useNavigate();
  const closeModal = () => {
    // eslint-disable-next-line no-unused-expressions
    onClose ? onClose() : navigate.goBack();
  };

  React.useEffect(() => {
    function onKeyDown(evt) {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return createPortal(
    <>
      <PopupOverlay onClose={closeModal} />
      <div className={`${popupSize} popup`}>
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={closeModal} />
        {children}
      </div>
    </>,
    document.getElementById('modals'),
  );
}
