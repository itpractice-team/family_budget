/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { mockUser } from '../../iAmBack/mockUser';
import { setUser } from '../../store/slices/loginSlice';
import { togglePopup } from '../../store/slices/popupSlice';

function Login() {
  const [message, setMessage] = useState('');
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  const handleLogin = (email, password) => {
    if (email === mockUser.email && password === mockUser.password) {
      dispatch(
        setUser({
          email: mockUser.email,
          name: mockUser.name,
          token: mockUser.token,
          phone: mockUser.phone,
          currency: mockUser.currency,
        }),
        togglePopup(),
      );

      setMessage('Вы успешно авторизировались!');
    } else {
      setMessage('Что-то пошло не так! Попробуйте ещё раз.');
    }
  };
  useEffect(() => {
    dispatch(togglePopup());
  }, []);

  return 
  <LoginForm title="sign in" handleClick={handleLogin} message={message} />
}

export default Login;
