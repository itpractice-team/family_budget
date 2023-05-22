/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { mockUser } from '../../iAmBack/mockUser';
import { setUser } from '../../store/slices/loginSlice';
import { togglePopup } from '../../store/slices/popupSlice';
import LoginForm from '../LoginForm/LoginForm';
import Popup from '../Popup/Popup';

function Login() {
  const [message, setMessage] = useState('');
  const { isAuth } = useAuth();
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.togglePopup); 

  // dispatch(togglePopup());
  useEffect(() => {
    dispatch(togglePopup());
    console.log('LOGIN')
  }, []);

  useEffect(()=>{
    console.log('inLogin', isPopupOpen);
  }, [isPopupOpen]);
  const handleLogin = (email, password) => {
    if (email === mockUser.email && password === mockUser.password) {
       dispatch(
        setUser({
          email: mockUser.email,
          name: mockUser.name,
          token: mockUser.token,
          phone: mockUser.phone,
          currency: mockUser.currency,
        })
      );
      dispatch(togglePopup());

      setMessage('Вы успешно авторизировались!');
    } else {
      setMessage('Что-то пошло не так! Попробуйте ещё раз.');
    }
  };

  return !isAuth ? (
    <Popup>
      {!isAuth ? <LoginForm
        title="signin"
        onLogin={handleLogin}
      /> : 
      <h2 className='login__message'>{message}</h2>}
    </Popup>
  ) : (
    <Navigate to="/" />
  );
}

export default Login;
