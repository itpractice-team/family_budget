/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

import * as yup from 'yup';

const loginValidation = yup.object().shape({
  loginOrEmail: yup
    .string()
    .required('Поле Логин или Email не может быть пустым')
    .min(2, 'Поле Логин или Email не может быть короче 2 символов')
    .max(40, 'Поле Логин или Email не может быть длиннее 40 символов')
    .test('loginOrEmail', 'Введите правильный логин или адрес электронной почты', (value) => {
      // Check if it is login
      const isLogin = /^[a-zA-Z0-9_./+-]+$/.test(value);
      // Check if it is email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isLogin && !isEmail) {
        return false;
      }
      return true;
    }),
  password: yup
    .string()
    .required('Поле Пароль не может быть пустым')
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль не может быть длиннее 40 символов')
    .test(
      'special-characters',
      'Пароль должен содержать хотя бы один спецсимвол и не состоять только из цифр',
      function (value) {
        const pattern = /^(?=.*[^a-zA-Z0-9])[\w\W]+$/;
        return pattern.test(value);
      },
    )
    .test('not-all-digits', 'Пароль не может состоять только из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
});

export default loginValidation;
