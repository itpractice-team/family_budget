
import * as yup from 'yup';

const loginValidation = yup.object().shape({
    loginOrEmail: yup
      .string()
      .required('Поле Пароль не может быть пустым')
      .test(
        'loginOrEmail',
        'Введите правильный логин или адрес электронной почты',
        (value) => {
          // Check if it is login
          const isLogin = /^[a-zA-Z0-9_.-]+$/.test(value);
          // Check if it is email
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          if (!isLogin && !isEmail) {
            return false;
          }
          return true;
        },
      ),
    password: yup
      .string()
      .required('Поле Пароль не может быть пустым')
      .min(6, 'Пароль не может быть короче 6 символов')
      .max(20, 'Пароль не может быть длиннее 20 символов'),
  });

  export default loginValidation;