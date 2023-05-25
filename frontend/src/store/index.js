import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/loginSlice';
import togglePopupReducer from './slices/popupSlice';
import { popupReducer } from './slices/togglePopupSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    togglePopup: togglePopupReducer,
    popup: popupReducer,
  },
});

export default store;
