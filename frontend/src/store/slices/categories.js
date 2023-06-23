import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserCategoriesAPI } from '../../utils/api';

export const getUserCategories = createAsyncThunk('categories', async () => {
  return getUserCategoriesAPI();
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
      .addCase(getUserCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.results;
      })
      .addCase(getUserCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
