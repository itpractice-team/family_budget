/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookies';

export const changePasswordAPI = async (formData) => {
  try {
    const response = await fetch('https://familybudget.ddns.net/api/users/set_password/', {
      method: 'POST',
      headers: {
        authorization: `Token ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Change password failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changePassword = createAsyncThunk(
  'changePassword',
  // eslint-disable-next-line camelcase
  async (formData) => {
    try {
      // eslint-disable-next-line camelcase
      const response = await changePasswordAPI(formData);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

const initialState = {
  // eslint-disable-next-line no-unneeded-ternary
  data: null,
  loading: false,
  error: null,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const passwordReducer = passwordSlice.reducer;
