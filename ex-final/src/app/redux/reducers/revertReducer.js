import { createSlice } from "@reduxjs/toolkit";

const revertReducer = createSlice({

  name: "reverted",
  initialState: {
    reverted: {
      fetching: false,
      currentReverted: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    revertedStart: (state) => {
      state.reverted.isFetching = false;
      state.reverted.fetching = true;
    },
    revertedSuccess: (state, action) => {
      state.reverted.isFetching = true;
      state.reverted.currentReverted = action.payload;
    },
    revertedFailed: (state) => {
      state.reverted.error = true;
    },

  },
});

export const { revertedStart, revertedSuccess, revertedFailed } = revertReducer.actions;

export default revertReducer.reducer;