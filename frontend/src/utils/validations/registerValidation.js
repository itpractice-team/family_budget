/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */


import * as yup from 'yup';

const registerValidation = yup.object().shape({
  email: yup
    .string()
    .required('Поле E-mail не пустое')
    .min(6, 'Поле E-mail не короче 6 символов')
    .max(130, 'Поле E-mail не длиннее 130 символов')
    .email('Введите корректный E-mail'),
  username: yup
    .string()
    .required('Поле Логин не пустое')
    .min(2, 'Поле Логин не короче 2 символов')
    .max(25, 'Поле Логин не длиннее 25 символов')
    .test('login', 'Введите правильный логин', (value) => {
      // Check if it is login
      const isLogin = /^[a-zA-Z0-9_./+-\s]+$/.test(value);
      if (!isLogin) {
        return false;
      }
      return true;
    })
    .test('noSpace', 'Логин не состоит из пробелов', (value) => {
      // Check if it is login
      const isLogin = value.trim();
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
    .max(25, 'Поле Имя не длиннее 25 символов'),
  last_name: yup
    .string()
    .test('last_name', (value) => {
      if (!value || value.trim().length === 0) {
        return true;
      }
      return value.length > 0;
    })
    .max(25, 'Поле Фамилия не длиннее 25 символов'),
  password: yup
    .string()
    .required('Поле Пароль не пустое')
    .min(8, 'Пароль не короче 8 символов')
    .max(40, 'Пароль не длиннее 40 символов')
    .test(
      'special-characters',
      'Пароль содержит хотя бы 1 спецсимвол',
      function (value) {
        const pattern = /^(?=.*[^a-zA-Z0-9])[\w\W]+$/;
        return pattern.test(value);
      },
    )
    .test(
      'latin',
      'Пароль не может содержать кирилицу',
      function (value) {
        const pattern = /[А-Яа-я]+$/;
        return !pattern.test(value);
      },
    )
    .test('not-all-digits', 'Пароль не состоит из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
  confirmPassword: yup
    .string()
    .required('Поле Повторить пароль не пустое')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .min(8, 'Пароль не короче 8 символов')
    .max(40, 'Пароль не длиннее 40 символов'),
    agree: 
    yup
    .boolean()
    .oneOf([true]),
});

export default registerValidation;
