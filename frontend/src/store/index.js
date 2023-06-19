import { configureStore } from '@reduxjs/toolkit';
import { popupReducer } from './slices/togglePopupSlice';
import { registrationReducer } from './slices/registerSlice';
import { loginReducer } from './slices/loginSlice';
import { userReducer } from './slices/userSlice';
import { passwordReducer } from './slices/passwordSlice';
import { dateReducer } from './slices/dateSlice';
import { userFinanceReducer } from './slices/userFinance';
import { financeReducer } from './slices/finance';
import { categoriesReducer } from './slices/categories';
import { moneyboxReducer } from './slices/moneybox';
import { transactionListReducer } from './slices/transactionList';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    registration: registrationReducer,
    login: loginReducer,
    user: userReducer,
    password: passwordReducer,
    dates: dateReducer,
    userFinance: userFinanceReducer,
    finance: financeReducer,
    categories: categoriesReducer,
    moneybox: moneyboxReducer,
    transactionList: transactionListReducer,
  },
});

export default store;
