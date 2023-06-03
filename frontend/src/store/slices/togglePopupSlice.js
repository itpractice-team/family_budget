import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenSpendingPopup: false,
  isOpenEarningPopup: false,
  isRegisterPopupOpen: false,
  isLoginPopupOpen: false,
  isPasswordChangePopupOpen: false,
  isAvatarUploaderPopupOpen: false,
  isConfirmationPopupOpen: false,
  isInfoPopupOpen: false,
};

const togglePopupSlice = createSlice({
  name: 'togglePopup',
  initialState,
  reducers: {
    toggleSpendingPopup: (state, { payload }) => {
      state.isSpendingPopupOpen = payload;
    },
    toggleEarningPopup: (state, { payload }) => {
      state.isEarningPopupOpen = payload;
    },
    toggleRegisterPopup: (state, { payload }) => {
      state.isRegisterPopupOpen = payload;
    },
    toggleLoginPopup: (state, { payload }) => {
      state.isLoginPopupOpen = payload;
    },
    togglePasswordChangePopup: (state, { payload }) => {
      state.isPasswordChangePopupOpen = payload;
    },
    toggleAvatarUploaderPopup: (state, { payload }) => {
      state.isAvatarUploaderPopupOpen = payload;
    },
    toggleConfirmationPopup: (state, { payload }) => {
      state.isConfirmationPopupOpen = payload;
    },
    toggleInfoPopup: (state, { payload }) => {
      state.isInfoPopupOpen = payload;
    },
  },
});

export const {
  toggleSpendingPopup,
  toggleEarningPopup,
  toggleRegisterPopup,
  toggleLoginPopup,
  togglePasswordChangePopup,
  toggleAvatarUploaderPopup,
  toggleConfirmationPopup,
  toggleInfoPopup,
} = togglePopupSlice.actions;

export const popupReducer = togglePopupSlice.reducer;
