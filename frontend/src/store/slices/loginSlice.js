/* eslint-disable camelcase */
/* eslint-disable no-unneeded-ternary */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserAPI, logoutUserAPI } from '../../utils/api';
import { getCookie } from '../../utils/cookies';

export const loginUser = createAsyncThunk('user/login', async ({ username, password }) => {
  return loginUserAPI({ username, password });
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  return logoutUserAPI();
});

const initialState = {
  login: getCookie('token') ? true : false,
  loading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
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
        state.login = true;
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
        state.login = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLogin } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
