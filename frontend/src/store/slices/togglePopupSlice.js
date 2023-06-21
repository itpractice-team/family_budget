import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: {
    spend: false,
    income: false,
    register: false,
    login: false,
    passwordChange: false,
    avatarUploader: false,
    confirmation: false,
    info: false,
    account: false,
    editTransaction: false,
    repeatExpenses: false,
    editMoneybox: false,
    doneMoneybox: false,
    addMoneybox: false,
    transfer: false,
  },
};

const togglePopupSlice = createSlice({
  name: 'togglePopup',
  initialState,
  reducers: {
    togglePopup: (state, { payload }) => {
      const { popupType, isOpen } = payload;
      state.isOpen[popupType] = isOpen;
    },
  },
});

export const { togglePopup } = togglePopupSlice.actions;
export const popupReducer = togglePopupSlice.reducer;
