import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccontsAPI } from '../../utils/api';

export const getAccounts = createAsyncThunk('accounts', async () => {
  return getAccontsAPI();
});

const initialState = {
  accounts: [],
  loading: false,
  error: null,
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload.results;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const accountsReducer = accountsSlice.reducer;
