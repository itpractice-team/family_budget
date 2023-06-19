import { createSlice } from '@reduxjs/toolkit';

const today = new Date();
const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const initialState = {
  startDate: formatDate(weekAgo),
  endDate: formatDate(today),
};

export const dateSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    setDateStart: (state, { payload }) => {
      state.startDate = payload;
    },
    setDateEnd: (state, { payload }) => {
      state.endDate = payload;
    },
  },
});

export const { setDateStart, setDateEnd } = dateSlice.actions;

export const dateReducer = dateSlice.reducer;
