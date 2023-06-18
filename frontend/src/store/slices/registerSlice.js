/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUserAPI } from '../../utils/api';

export const registerUser = createAsyncThunk('user/register', async (userData) => {
  return registerUserAPI(userData);
});

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Обработка действий, созданных createAsyncThunk
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const registrationReducer = registrationSlice.reducer;
