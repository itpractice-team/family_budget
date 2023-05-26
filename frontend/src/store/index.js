import { configureStore } from '@reduxjs/toolkit';
import { popupReducer } from './slices/togglePopupSlice';
import { registrationReducer } from './slices/registerSlice';
import { loginReducer } from './slices/loginSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    registration: registrationReducer,
    login: loginReducer,
  },
});

export default store;
