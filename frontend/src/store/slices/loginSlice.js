/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  userName: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { email, name } = action.payload;
      return {
        ...state,
        email,
        userName: name,
      };
    },
    removeUser(state) {
      return {
        ...state,
        email: null,
        userName: null,
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
