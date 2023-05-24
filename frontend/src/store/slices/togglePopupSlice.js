import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenSpendingPopup: false,
  isOpenEarningPopup: false,
  isRegisterPopupOpen: false,
  isLoginPopupOpen: false,
};

const togglePopupSlice = createSlice({
  name: 'togglePopup',
  initialState,
  reducers: {
    toggleSpendingPopup: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.isSpendingPopupOpen = payload;
    },
    toggleEarningPopup: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.isEarningPopupOpen = payload;
    },
    toggleRegisterPopup: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.isRegisterPopupOpen = payload;
    },
    toggleLoginPopup: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoginPopupOpen = payload;
    },
  },
});

export const { toggleSpendingPopup, toggleEarningPopup, toggleRegisterPopup, toggleLoginPopup } =
  togglePopupSlice.actions;

export const popupReducer = togglePopupSlice.reducer;
