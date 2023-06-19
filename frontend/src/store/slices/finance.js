import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFinanceListAPI } from '../../utils/api';

export const getFinanceList = createAsyncThunk('finance', async () => {
  return getFinanceListAPI();
});

const initialState = {
  finance: [],
  loading: false,
  error: null,
};

export const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFinanceList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFinanceList.fulfilled, (state, action) => {
        state.loading = false;
        state.finance = action.payload.results;
      })
      .addCase(getFinanceList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const financeReducer = financeSlice.reducer;
