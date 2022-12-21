import { createSlice } from "@reduxjs/toolkit";

const approveReducer = createSlice({

  name: "approved",
  initialState: {
    approved: {
      fetching: false,
      currentApproved: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    approvedStart: (state) => {
      state.approved.isFetching = false;
      state.approved.fetching = true;
    },
    approvedSuccess: (state, action) => {
      state.approved.isFetching = true;
      state.approved.currentApproved = action.payload;
    },
    approvedFailed: (state) => {
      state.approved.error = true;
    },

  },
});

export const { approvedStart, approvedSuccess, approvedFailed } = approveReducer.actions;

export default approveReducer.reducer;