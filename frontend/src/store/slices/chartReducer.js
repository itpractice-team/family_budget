import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDinamicChartShow: true,
  isDifferenceChartOn: false,
};

const chartSlice = createSlice({
  name: 'chartSlice',
  initialState,
  reducers: {
    toggleInfoPopup: (state, { payload }) => {
      state.isInfoPopupOpen = payload;
    },
    toggleSpendPopup: (state, { payload }) => {
      state.isSpendPopupOpen = payload;
    },
  },
});

export const {
  toggleSpendPopup,
  toggleIncomePopup,
} = togglePopupSlice.actions;

export const popupReducer = togglePopupSlice.reducer;
