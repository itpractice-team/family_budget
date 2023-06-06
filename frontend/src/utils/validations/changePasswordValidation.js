/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */


import * as yup from 'yup';

const changePasswordValidation = yup.object().shape({
  current_password: yup
    .string()
    .required('Поле "Текущий пароль" не может быть пустым')
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
    new_password: yup
    .string()
    .required('Поле "Новый пароль" не может быть пустым')
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
    re_new_password: yup
    .string()
    .required('Поле "Новый пароль ещё раз" не может быть пустым')
    .oneOf([yup.ref('new_password'), null], 'Пароли должны совпадать')
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

export default changePasswordValidation;
