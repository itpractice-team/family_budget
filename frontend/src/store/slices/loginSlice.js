/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  userName: null,
  firstName: null,
  lastName: null,
  avatar: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.userName = action.payload.username;
      state.firstName = action.payload.first_name || '';
      state.LastName = action.payload.last_name || '';
      state.avatar = action.payload.avatar || '';
      state.token = action.payload.token;
    },
    removeUser(state) {
      return {
        ...state,
        email: null,
        userName: null,
        firstName: null,
        lastName: null,
        avatar: null,
        token: null,
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
