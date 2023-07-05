import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addRepeatSpendBoxAPI,
  deleteRepeatSpendBoxAPI,
  editRepeatSpendBoxAPI,
  getRepeatSpendBoxAPI,
} from '../../utils/api';

export const getRepeatSpendBox = createAsyncThunk('repeatSpendBox', async () => {
  return getRepeatSpendBoxAPI();
});

export const addRepeatSpendBox = createAsyncThunk('repeatSpendBox/add', async ({ formData }) => {
  console.log('api', formData);
  return addRepeatSpendBoxAPI(formData);
});

export const editRepeatSpendBox = createAsyncThunk(
  'repeatSpendBox/edit',
  async ({ id, formData }) => {
    return editRepeatSpendBoxAPI(id, formData);
  },
);

export const deleteRepeatSpendBox = createAsyncThunk('repeatSpendBox/delete', async ({ id }) => {
  return deleteRepeatSpendBoxAPI(id);
});

const initialState = {
  repeatSpendBox: [],
  loading: false,
  error: null,
};

export const repeatSpendBoxSlice = createSlice({
  name: 'repeatSpendBox',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepeatSpendBox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRepeatSpendBox.fulfilled, (state, action) => {
        state.loading = false;
        state.repeatSpendBox = action.payload.results;
      })
      .addCase(getRepeatSpendBox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRepeatSpendBox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRepeatSpendBox.fulfilled, (state, action) => {
        state.loading = false;
        console.log('pay', action.payload);
        state.repeatSpendBox.push(action.payload);
      })
      .addCase(addRepeatSpendBox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editRepeatSpendBox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRepeatSpendBox.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const editedRepeatSpendBox = action.payload;
        state.repeatSpendBox = state.repeatSpendBox.map((item) => {
          if (item.id === editedRepeatSpendBox.id) {
            return editedRepeatSpendBox;
          }
          return item;
        });
      })
      .addCase(editRepeatSpendBox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRepeatSpendBox.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRepeatSpendBox.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteRepeatSpendBox.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const repeatSpendBoxReducer = repeatSpendBoxSlice.reducer;
