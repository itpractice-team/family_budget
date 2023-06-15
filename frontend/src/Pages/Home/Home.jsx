import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.scss';
import InfoPopup from '../../Components/InfoPopup/InfoPopup';
import { toggleInfoPopup } from '../../store/slices/togglePopupSlice';
import СonfirmationPasswordChange from '../../Components/СonfirmationPasswordChange/СonfirmationPasswordChange';
import { getUser } from '../../store/slices/userSlice';
import Footer from '../../Components/Footer/Footer';

export default function Main({ children }) {
  const dispatch = useDispatch();

  const isInfoPopupOpen = useSelector((state) => state.popup.isInfoPopupOpen);
  const isFetched = useSelector((state) => state.user.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [dispatch, isFetched]);

  const closeInfoPopup = () => {
    dispatch(toggleInfoPopup(false));
  };

  return (
    <section className="home-page">
      {children}
      {isInfoPopupOpen && (
        <InfoPopup
          onClose={closeInfoPopup}
          content={<СonfirmationPasswordChange />}
          title="Пароль успешно изменен"
        />
      )}
      <Footer extraClass="footer-absolute" />
    </section>
  );
}
