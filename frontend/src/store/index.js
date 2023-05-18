import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/loginSlice';
import togglePopupReducer from './slices/popupSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    togglePopup: togglePopupReducer,
  },
});

export default store;
