import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMoneyboxAPI } from '../../utils/api';

export const getMoneybox = createAsyncThunk('moneybox', async () => {
  return getMoneyboxAPI();
});

const initialState = {
  moneybox: [],
  loading: false,
  error: null,
};

export const moneyboxSlice = createSlice({
  name: 'moneybox',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoneybox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoneybox.fulfilled, (state, action) => {
        state.loading = false;
        state.moneybox = action.payload.results;
      })
      .addCase(getMoneybox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const moneyboxReducer = moneyboxSlice.reducer;
