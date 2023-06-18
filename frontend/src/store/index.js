import { configureStore } from '@reduxjs/toolkit';
import { popupReducer } from './slices/togglePopupSlice';
import { registrationReducer } from './slices/registerSlice';
import { loginReducer } from './slices/loginSlice';
import { userReducer } from './slices/userSlice';
import { passwordReducer } from './slices/passwordSlice';
import { accountsReducer } from './slices/accounts';
import { categoriesReducer } from './slices/categories';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    registration: registrationReducer,
    login: loginReducer,
    user: userReducer,
    password: passwordReducer,
    accounts: accountsReducer,
    categories: categoriesReducer,
  },
});

export default store;
