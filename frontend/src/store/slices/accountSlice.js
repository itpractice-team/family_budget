import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserAPI, getUserAPI, updateUserAPI, deleteUserAPI } from '../../utils/api';

export const registerUser = createAsyncThunk('account/registerUser', async (userData) => {
  return registerUserAPI(userData);
});

export const getUser = createAsyncThunk('account/getData', async () => {
  return getUserAPI();
});

export const updateUser = createAsyncThunk('account/updateData', async (userData) => {
  return updateUserAPI(userData);
});

export const deleteUser = createAsyncThunk('account/deleteData', async () => {
  return deleteUserAPI();
});

const initialState = {
  data: null,
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

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = initialState.user;
      state.isFetched = false;
    },
  },
  extraReducers: (builder) => {
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
      })
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

export const { resetUser } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
