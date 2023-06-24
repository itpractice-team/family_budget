import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserCategoriesAPI, getUserFinanceAPI } from '../../utils/api';

export const getUserCategories = createAsyncThunk(
  'userFinanceAndCategories/getUserCategories',
  async () => {
    return getUserCategoriesAPI();
  },
);

export const getUserFinance = createAsyncThunk(
  'userFinanceAndCategories/getUserFinance',
  async () => {
    return getUserFinanceAPI();
  },
);

const initialState = {
  userCategories: [],
  userFinance: [],
  loading: false,
  error: null,
};

export const userFinanceAndCategoriesSlice = createSlice({
  name: 'userFinanceAndCategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.userCategories = action.payload.results;
      })
      .addCase(getUserCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserFinance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserFinance.fulfilled, (state, action) => {
        state.loading = false;
        state.userFinance = action.payload.results;
      })
      .addCase(getUserFinance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userFinanceAndCategoriesReducer = userFinanceAndCategoriesSlice.reducer;
