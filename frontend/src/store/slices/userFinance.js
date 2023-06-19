import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserFinanceAPI } from '../../utils/api';

export const getUserFinance = createAsyncThunk('user/finance', async () => {
  return getUserFinanceAPI();
});

const initialState = {
  finance: [],
  loading: false,
  error: null,
};

export const userFinanceSlice = createSlice({
  name: 'userFinance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserFinance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserFinance.fulfilled, (state, action) => {
        state.loading = false;
        state.finance = action.payload.results;
      })
      .addCase(getUserFinance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userFinanceReducer = userFinanceSlice.reducer;
