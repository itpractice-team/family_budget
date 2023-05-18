import { createSlice } from '@reduxjs/toolkit';

const togglePopupSlice = createSlice({
    name: 'togglePopup',
    initialState: false, // Set the initial state to false
    reducers: {
      togglePopup: (state) => !state, // Toggle the state between true and false
    },
  });
  
  // Export the slice actions
  export const { togglePopup } = togglePopupSlice.actions;
  
  // Export the slice reducer
  export default togglePopupSlice.reducer;