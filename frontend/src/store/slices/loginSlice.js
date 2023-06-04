/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookies';

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

export const logoutUserAPI = async () => {
  try {
    const response = await fetch('https://familybudget.ddns.net/api/auth/token/logout/', {
      method: 'POST',
      headers: {
        authorization: `Token ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    deleteCookie('token');

    return {};
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

export const logoutUser = createAsyncThunk('user/logout', async () => {
  try {
    const response = await logoutUserAPI();
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

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, { payload }) => {
      state.login = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const { auth_token } = action.payload;
        setCookie('token', auth_token);
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
        deleteCookie('token');
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
