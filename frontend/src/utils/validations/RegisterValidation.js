/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

import * as yup from 'yup';

const registerValidation = yup.object().shape({
  email: yup
    .string()
    .required('Поле E-mail не может быть пустым')
    .email('Введите корректный E-mail'),
  username: yup
    .string()
    .required('Поле Логин не может быть пустым')
    .min(2, 'Поле Логин не может быть короче 2 символов')
    .max(25, 'Поле Логин не может быть длиннее 25 символов')
    .test('login', 'Введите правильный логин', (value) => {
      // Check if it is login
      const isLogin = /^[a-zA-Z0-9_./+-]+$/.test(value);
      if (!isLogin) {
        return false;
      }
      return true;
    }),
  first_name: yup
    .string()
    .test('first_name', (value) => {
      if (!value || value.trim().length === 0) {
        return true;
      }
      return value.length > 0;
    })
    .max(25, 'Поле Имя не может быть длиннее 25 символов'),
  last_name: yup
    .string()
    .test('last_name', (value) => {
      if (!value || value.trim().length === 0) {
        return true;
      }
      return value.length > 0;
    })
    .max(25, 'Поле Фамилия не может быть длиннее 25 символов'),
  password: yup
    .string()
    .required('Поле Пароль не может быть пустым')
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль не может быть длиннее 40 символов')
    .test(
      'special-characters',
      'Пароль должен содержать хотя бы один спецсимвол',
      function (value) {
        const pattern = /^(?=.*[^a-zA-Z0-9])[\w\W]+$/;
        return pattern.test(value);
      },
    )
    .test('not-all-digits', 'Пароль не может состоять только из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
  confirmPassword: yup
    .string()
    .required('Поле Повторить пароль не может быть пустым')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .min(8, 'Пароль не может быть короче 8 символов')
    .max(40, 'Пароль не может быть длиннее 40 символов')
    .test(
      'special-characters',
      'Пароль должен содержать хотя бы один спецсимвол',
      function (value) {
        const pattern = /^(?=.*[^a-zA-Z0-9])[\w\W]+$/;
        return pattern.test(value);
      },
    )
    .test('not-all-digits', 'Пароль не может состоять только из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
});

export default registerValidation;

/* ; */ // Функция для сравнения вводимых паролей. Просто добавь в код:) ну и стейты тоже.
