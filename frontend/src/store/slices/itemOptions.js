import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFinanceOptionsAPI, getCategoryIconsAPI } from '../../utils/api';

export const getFinanceOptions = createAsyncThunk('itemOptions/getFinanceOptions', async () => {
  return getFinanceOptionsAPI();
});

export const getCategoryOptions = createAsyncThunk('itemOptions/getCategoryIcons', async () => {
  return getCategoryIconsAPI();
});

const initialState = {
  finance: [],
  categoryIcons: [],
  loading: false,
  error: null,
};

export const itemOptionsSlice = createSlice({
  name: 'itemOptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFinanceOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFinanceOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.finance = action.payload.results;
      })
      .addCase(getFinanceOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCategoryOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryIcons = action.payload.results;
      })
      .addCase(getCategoryOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const itemOptionsReducer = itemOptionsSlice.reducer;
