import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategoriesAPI } from '../../utils/api';

export const getCategories = createAsyncThunk('categories', async () => {
  return getCategoriesAPI();
});

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.results;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
