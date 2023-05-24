import { createSlice } from '@reduxjs/toolkit';

const togglePopupSlice = createSlice({
  name: 'togglePopup',
  initialState: false,
  reducers: {
    togglePopup: (state) => !state.togglePopup,
  },
  });
  // Export the slice actions
  export const { togglePopup } = togglePopupSlice.actions;
  
  // Export the slice reducer
  export default togglePopupSlice.reducer;