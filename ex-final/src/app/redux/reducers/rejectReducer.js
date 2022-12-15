import { createSlice } from "@reduxjs/toolkit";

const rejectReducer = createSlice({

  name: "rejected",
  initialState: {
    rejected: {
      fetching: false,
      currentRejected: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    rejectedStart: (state) => {
      state.rejected.isFetching = false;
      state.rejected.fetching = true;
    },
    rejectedSuccess: (state, action) => {
      state.rejected.isFetching = true;
      state.rejected.currentRejected = action.payload;
    },
    rejectedFailed: (state) => {
      state.rejected.error = true;
    },

  },
});

export const { rejectedStart, rejectedSuccess, rejectedFailed } = rejectReducer.actions;

export default rejectReducer.reducer;