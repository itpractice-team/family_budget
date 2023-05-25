// /* eslint-disable react-hooks/exhaustive-deps */
// // import { useDispatch, useSelector } from 'react-redux';
// // import './Popup.scss';
// // import { useState, useEffect } from 'react';
// // import PropTypes from 'prop-types';
// // import { togglePopup } from '../../store/slices/popupSlice';

// import React from 'react';
// import { createPortal } from 'react-dom';
// import { useNavigate } from 'react-router-dom';
// import './Popup.scss';
// import ModalOverlay from '../ModalOverlay/ModalOverlay';

// export default function Popup({ children, onClose }) {
//   const navigate = useNavigate();
//   const closeModal = () => {
//     // eslint-disable-next-line no-unused-expressions
//     onClose ? onClose() : navigate.goBack();
//   };

//   React.useEffect(() => {
//     function onKeyDown(evt) {
//       if (evt.key === 'Escape') {
//         closeModal();
//       }
//     }

//     document.addEventListener('keydown', onKeyDown);

//     return () => {
//       document.removeEventListener('keydown', onKeyDown);
//     };
//   }, []);

//   return createPortal(
//     <section
//       className={`popup ${popupClass}`}
//       onClick={closePopup}
//       onKeyDown={closePopup}
//       role="button"
//       tabIndex="0"
//     >
//       <div className="popup__wrapper">
//         <button className="popup__close" type="button" aria-label="закрыть" onClick={closePopup} />

//         {/* <form className="form" onSubmit={handleSubmit}>
//         <h2 className="form__header">{formHeaderText}</h2> */}

//         {children}

//         {/* <button type="reset" className="form__button form__button_reset">
//             Отменить
//           </button>

//           <button type="submit" className="form__button form__button_submit">
//             Готово
//           </button> */}
//         {/* </form> */}
//       </div>
//     </section>,
//   );
// }

import React from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './Popup.scss';
import PopupOverlay from '../PopupOverlay/PopupOverlay';

export default function Popup({ children, onClose }) {
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
      <div className="popup">
        <button type="button" className="popup__close" aria-label="Закрыть" onClick={closeModal} />
        {children}
      </div>
    </>,
    document.getElementById('modals'),
  );
}
