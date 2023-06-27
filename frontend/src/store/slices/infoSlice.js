import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { infoAPI } from '../../utils/api';

export const getInfo = createAsyncThunk('info', async () => {
  return infoAPI();
});

const initialState = {
  info: [],
  loading: false,
  error: null,
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.results;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const infoReducer = infoSlice.reducer;
