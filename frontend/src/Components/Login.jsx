/* eslint-disable no-console */
/* eslint-disable no-alert */
// eslint-disable import/no-extraneous-dependencies
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import AuthForm from './AuthForm';
import { useAuth } from '../hooks/useAuth';
import { mockUser } from '../iAmBack/mockUser';
import { setUser } from '../store/slices/loginSlice';

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
        }),
      );
      setMessage('Вы успешно авторизировались!');
    } else {
      setMessage('Что-то пошло не так! Попробуйте ещё раз.');
    }
  };

  return !isAuth ? (
    <AuthForm title="sign in" handleClick={handleLogin} message={message} />
  ) : (
    <Navigate to="/" />
  );
}

export default Login;
