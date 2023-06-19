import { configureStore } from '@reduxjs/toolkit';
import { popupReducer } from './slices/togglePopupSlice';
import { registrationReducer } from './slices/registerSlice';
import { loginReducer } from './slices/loginSlice';
import { userReducer } from './slices/userSlice';
import { passwordReducer } from './slices/passwordSlice';
import { dateReducer } from './slices/dateSlice';
import { userFinanceReducer } from './slices/userFinance';
import { categoriesReducer } from './slices/categories';
import { moneyboxReducer } from './slices/moneybox';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    registration: registrationReducer,
    login: loginReducer,
    user: userReducer,
    password: passwordReducer,
    dates: dateReducer,
    userFinance: userFinanceReducer,
    categories: categoriesReducer,
    moneybox: moneyboxReducer,
  },
});

export default store;
