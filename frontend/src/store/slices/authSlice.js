/* eslint-disable camelcase */
/* eslint-disable no-unneeded-ternary */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserAPI, logoutUserAPI } from '../../utils/api';
import { getCookie } from '../../utils/cookies';

export const loginUser = createAsyncThunk('auth/login', async ({ username, password }) => {
  return loginUserAPI({ username, password });
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  return logoutUserAPI();
});

const initialState = {
  isAuthenticated: getCookie('token') ? true : false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAuthentication } = authSlice.actions;

export const authReducer = authSlice.reducer;
