/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAPI, updateUserAPI, deleteUserAPI } from '../../utils/api';

export const getUser = createAsyncThunk('user/getData', async () => {
  return getUserAPI();
});

export const updateUser = createAsyncThunk('user/updateData', async (userData) => {
  return updateUserAPI(userData);
});

export const deleteUser = createAsyncThunk('user/deleteData', async () => {
  return deleteUserAPI();
});

const initialState = {
  user: {
    id: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    avatar: null,
  },
  isFetched: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = initialState.user;
      state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isFetched = true;
        state.user = { ...action.payload };
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isFetched = true;
        state.user = { ...action.payload };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...action.payload };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
