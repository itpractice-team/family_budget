import './App.scss';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Budget from '../Pages/Budget/Budget';
import Statistic from '../Pages/Statistic/Statistic';
import Help from '../Pages/Help/Help';
import Profile from '../Pages/Profile/Profile';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import EditProfile from '../Pages/EditProfile/EditProfile';

function App() {
  const [isSpendingPopupOpen, setIsSpendingPopupOpen] = useState(false);
  const [isEarningPopupOpen, setIsEarningPopupOpen] = useState(false);
  const [isPasswordChangePopupOpen, setIsPasswordChangePopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  function openSpendingPopup() {
    setIsSpendingPopupOpen(true);
  }

  function openEarningPopup() {
    setIsEarningPopupOpen(true);
  }

  function openPasswordChangePopup() {
    setIsPasswordChangePopupOpen(true);
  }

  function openRegisterPopup() {
    setIsRegisterPopupOpen(true);
  }

  function openLoginPopup() {
    setIsLoginPopupOpen(true);
  }

  function closePopup(event) {
    if (
      event.key === 'Escape' ||
      event.target.classList.contains('popup__close') ||
      event.currentTarget === event.target
    ) {
      setIsSpendingPopupOpen(false);
      setIsEarningPopupOpen(false);
      setIsPasswordChangePopupOpen(false);
      setIsRegisterPopupOpen(false);
      setIsLoginPopupOpen(false);
    }
  }

  function redirectAuthorizationPopup() {
    if (isLoginPopupOpen) {
      setIsLoginPopupOpen(false);
      setIsRegisterPopupOpen(true);
    } else if (isRegisterPopupOpen) {
      setIsLoginPopupOpen(true);
      setIsRegisterPopupOpen(false);
    }
  }

  return (
    <div className="app">
      <Header
        openRegisterPopup={openRegisterPopup}
        closePopup={closePopup}
        isRegisterPopupOpen={isRegisterPopupOpen}
        openLoginPopup={openLoginPopup}
        isLoginPopupOpen={isLoginPopupOpen}
        redirectAuthorizationPopup={redirectAuthorizationPopup}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/budget"
          element={
            <Budget
              closePopup={closePopup}
              openSpendingPopup={openSpendingPopup}
              openEarningPopup={openEarningPopup}
              isSpendingPopupOpen={isSpendingPopupOpen}
              isEarningPopupOpen={isEarningPopupOpen}
            />
          }
        />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/help" element={<Help />} />
        <Route
          path="/profile"
          element={
            <Profile
              isPasswordChangePopupOpen={isPasswordChangePopupOpen}
              openPasswordChangePopup={openPasswordChangePopup}
              closePopup={closePopup}
            />
          }
        />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
