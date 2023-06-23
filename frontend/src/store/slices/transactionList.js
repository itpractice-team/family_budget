import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getTransactionListAPI,
  addTransactionAPI,
  deleteTransactionAPI,
  editTransactionAPI,
} from '../../utils/api';

export const getTransactionList = createAsyncThunk('transaction/list', async () => {
  return getTransactionListAPI();
});

export const addTransaction = createAsyncThunk('transaction/add', async (formData) => {
  return addTransactionAPI(formData);
});

export const deleteTransaction = createAsyncThunk('transaction/delete', async (id) => {
  return deleteTransactionAPI(id);
});

export const editTransaction = createAsyncThunk('transaction/edit', async (id, formData) => {
  return editTransactionAPI(id, formData);
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
      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionList.push(action.payload);
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const editedTransaction = action.payload;
        state.transactionList = state.transactionList.map((transaction) => {
          if (transaction.id === editedTransaction.id) {
            return editedTransaction;
          }
          return transaction;
        });
        state.loading = false;
        state.error = null;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const transactionListReducer = transactionListSlice.reducer;
