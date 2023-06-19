import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTransactionListAPI, addSpendAPI } from '../../utils/api';

export const getTransactionList = createAsyncThunk('transaction/list', async () => {
  return getTransactionListAPI();
});

export const addSpend = createAsyncThunk('transaction/spend', async (formData) => {
  return addSpendAPI(formData);
});

const initialState = {
  transactionList: [],
  loading: false,
  error: null,
};

export const transactionListSlice = createSlice({
  name: 'transactionList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionList.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionList = action.payload.results;
      })
      .addCase(getTransactionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSpend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSpend.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionList.push(action.payload);
      })
      .addCase(addSpend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const transactionListReducer = transactionListSlice.reducer;
