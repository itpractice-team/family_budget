import * as yup from 'yup';

const profileValidation = yup.object().shape({
  email: yup
    .string()
    .email('Введите корректный E-mail'),
  username: yup
    .string()
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
});

export default profileValidation;
