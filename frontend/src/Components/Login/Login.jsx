/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { mockUser } from '../../iAmBack/mockUser';
import { setUser } from '../../store/slices/loginSlice';
import { togglePopup } from '../../store/slices/popupSlice';
import LoginForm from '../LoginForm/LoginForm';
import Popup from '../Popup/Popup';
import { authorize } from '../../utils/testApi';

function Login() {
  const [message, setMessage] = useState('');
  const { isAuth } = useAuth();
  const dispatch = useDispatch();

  // dispatch(togglePopup());
  useEffect(() => {
    dispatch(togglePopup());
  }, []);

  const handleLogin = ({loginOrEmail, password}) => {
    // console.log('InLogon', 'logormail', loginOrEmail, 'pass', password, 'mock', mockUser )
    // if ((loginOrEmail === mockUser.email || loginOrEmail === mockUser.userName) && password === mockUser.password) {
      authorize(loginOrEmail, password)
      .then((user) => {
      console.log(user )
       dispatch(
        setUser({
          email: user.email,
          name: mockUser.name,
          token: user.token,
          // phone: mockUser.phone,
          // currency: mockUser.currency,
        })
      );
      dispatch(togglePopup());
      localStorage.setItem("jwt", user.token);
      setMessage("Вы успешно авторизировались!");
    })
    // } else {
      
    .catch((err) => {
      console.log('InLogonFalse', loginOrEmail, password )
      setMessage("Что-то пошло не так! Попробуйте ещё раз.", err);
    })
  }

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
