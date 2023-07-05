import * as yup from 'yup';

const addMoneyboxValidation = yup.object().shape({
  name: yup
    .string()
    .required('Поле не должно быть пустым')
    .matches(/^[а-яА-Яa-zA-Z\s]+$/, 'Поле должно содержать только буквы и пробелы'),
  amount: yup
    .number()
    .typeError('Поле должно быть числом и заполнено')
    .required('Поле не должно быть пустым')
    .positive('Поле должно быть положительным числом'),
});

export default addMoneyboxValidation;
