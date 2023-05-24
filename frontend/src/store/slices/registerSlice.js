/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const registerUserAPI = async (userData) => {
  try {
    const response = await fetch('https://familybudget.ddns.net/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Создание асинхронного действия с помощью createAsyncThunk
export const registerUser = createAsyncThunk('user/register', async (userData) => {
  try {
    const response = await registerUserAPI(userData);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: 'user',
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
