/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookies';

export const getUserAPI = async () => {
  try {
    const response = await fetch('https://familybudget.ddns.net/api/users/me/', {
      method: 'GET',
      headers: {
        authorization: `Token ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Getting user data failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUserAPI = async (userData) => {
  try {
    const response = await fetch('https://familybudget.ddns.net/api/users/me/', {
      method: 'PATCH',
      headers: {
        authorization: `Token ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Update user data failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserAPI = async () => {
  try {
    const response = await fetch('https://familybudget.ddns.net/api/users/me/', {
      method: 'DELETE',
      headers: {
        authorization: `Token ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Delete user data failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUser = createAsyncThunk('user/getData', async () => {
  try {
    const response = await getUserAPI();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateUser = createAsyncThunk('user/updateData', async (userData) => {
  try {
    const response = await updateUserAPI(userData);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteUser = createAsyncThunk('user/deleteData', async () => {
  try {
    const response = await deleteUserAPI();
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
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
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Обработка действий, созданных createAsyncThunk
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
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

export const userReducer = userSlice.reducer;
