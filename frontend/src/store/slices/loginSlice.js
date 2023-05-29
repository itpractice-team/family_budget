/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookies';

export const loginUserAPI = async (userData) => {
  try {
    const response = await fetch('https://familybudget.ddns.net/api/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Authorization failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = createAsyncThunk('user/login', async ({ username, password }) => {
  try {
    const response = await loginUserAPI({ username, password });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

const initialState = {
  // eslint-disable-next-line no-unneeded-ternary
  login: getCookie('token') ? true : false,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Обработка действий, созданных createAsyncThunk
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // eslint-disable-next-line camelcase
        const { auth_token } = action.payload;
        // eslint-disable-next-line camelcase
        setCookie('token', auth_token);
        state.login = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const loginReducer = loginSlice.reducer;
