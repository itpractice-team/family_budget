/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */


import * as yup from 'yup';

const changePasswordValidation = yup.object().shape({
  current_password: yup
    .string()
    .required('Поле "Текущий пароль" не пустое')
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
    .test('not-all-digits', 'Пароль не состоит из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
    new_password: yup
    .string()
    .required('Поле "Новый пароль" не пустое')
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
    .test('not-all-digits', 'Пароль не состоит из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
    re_new_password: yup
    .string()
    .required('Поле "Новый пароль ещё раз" не пустое')
    .oneOf([yup.ref('new_password'), null], 'Пароли должны совпадать')
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
    .test('not-all-digits', 'Пароль не состоит из цифр', function (value) {
      return !/^\d+$/.test(value);
    }),
});

export default changePasswordValidation;
