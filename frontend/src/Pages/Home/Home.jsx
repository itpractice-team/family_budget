import { useSelector, useDispatch } from 'react-redux';
import './Home.scss';
import InfoPopup from '../../Components/InfoPopup/InfoPopup';
import { toggleInfoPopup } from '../../store/slices/togglePopupSlice';
import СonfirmationPasswordChange from '../../Components/СonfirmationPasswordChange/СonfirmationPasswordChange';

export default function Main({ children }) {
  const dispatch = useDispatch();

  const isInfoPopupOpen = useSelector((state) => state.popup.isInfoPopupOpen);

  const closeInfoPopup = () => {
    dispatch(toggleInfoPopup(false));
  };

  return (
    <main className="content">
      {children}
      {isInfoPopupOpen && (
        <InfoPopup onClose={closeInfoPopup} content={<СonfirmationPasswordChange />} />
      )}
    </main>
  );
}
