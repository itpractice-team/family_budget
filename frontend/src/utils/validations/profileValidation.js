import * as yup from 'yup';

const emailRegex = /^[a-zA-Z0-9_-](\.?[a-zA-Z0-9_-]){0,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
const profileValidation = yup.object().shape({
  email: yup
    .string()
    .required('Поле E-mail не пустое')
    .min(6, 'Поле E-mail не короче 6 символов')
    .max(130, 'Поле E-mail не длиннее 130 символов')
    .matches(emailRegex, 'Введите корректный E-mail')
    .test('no-leading-trailing-dot', 'E-mail не должен начинаться или заканчиваться точкой', (value) => {
      return value && !value.startsWith('.') && !value.endsWith('.');
    }),
  username: yup
    .string()
    .min(2, 'Поле Логин не короче 2 символов')
    .max(25, 'Поле Логин не длиннее 25 символов')
    .test('login', 'Введите правильный логин', (value) => {
      // Check if it is login
      const isLogin = /^[a-zA-Z0-9_.\s/+-]+$/.test(value);
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
    .max(25, 'Фамилия не более 25 символов'),
});

export default profileValidation;
