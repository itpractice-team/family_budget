import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSpendingPopupOpen: false,
  isEarningPopupOpen: false,
  isRegisterPopupOpen: false,
  isLoginPopupOpen: false,
  isPasswordChangePopupOpen: false,
  isAvatarUploaderPopupOpen: false,
  isConfirmationPopupOpen: false,
  isInfoPopupOpen: false,
  isAccountsPopupOpen: false,
  isAddAccountPopupOpen: false,
};

const togglePopupSlice = createSlice({
  name: 'togglePopup',
  initialState,
  reducers: {
    toggleInfoPopup: (state, { payload }) => {
      state.isInfoPopupOpen = payload;
    },
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
    toggleAccountsPopup: (state, { payload }) => {
      state.isAccountsPopupOpen = payload;
    },
    toggleAddAccountPopup: (state, { payload }) => {
      state.isAddAccountPopupOpen = payload;
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
  toggleAccountsPopup,
  toggleAddAccountPopup,
} = togglePopupSlice.actions;

export const popupReducer = togglePopupSlice.reducer;
