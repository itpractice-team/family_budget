import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSpendPopupOpen: false,
  isIncomePopupOpen: false,
  isRegisterPopupOpen: false,
  isLoginPopupOpen: false,
  isPasswordChangePopupOpen: false,
  isAvatarUploaderPopupOpen: false,
  isConfirmationPopupOpen: false,
  isInfoPopupOpen: false,
  isAccountPopupOpen: false,
};

const togglePopupSlice = createSlice({
  name: 'togglePopup',
  initialState,
  reducers: {
    toggleInfoPopup: (state, { payload }) => {
      state.isInfoPopupOpen = payload;
    },
    toggleSpendPopup: (state, { payload }) => {
      state.isSpendPopupOpen = payload;
    },
    toggleIncomePopup: (state, { payload }) => {
      state.isIncomePopupOpen = payload;
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
    toggleAccountPopup: (state, { payload }) => {
      state.isAccountPopupOpen = payload;
    },
  },
});

export const {
  toggleSpendPopup,
  toggleIncomePopup,
  toggleRegisterPopup,
  toggleLoginPopup,
  togglePasswordChangePopup,
  toggleAvatarUploaderPopup,
  toggleConfirmationPopup,
  toggleInfoPopup,
  toggleAccountPopup,
} = togglePopupSlice.actions;

export const popupReducer = togglePopupSlice.reducer;
