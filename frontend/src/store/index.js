import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/loginSlice';
import togglePopupReducer from './slices/popupSlice';
import { popupReducer } from './slices/togglePopupSlice';
import { registrationReducer } from './slices/registerSlice';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    user: userReducer,
    togglePopup: togglePopupReducer,
    popup: popupReducer,
  },
});

export default store;
