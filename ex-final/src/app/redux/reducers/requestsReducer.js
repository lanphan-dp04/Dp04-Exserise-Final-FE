import { createSlice } from "@reduxjs/toolkit";

const reqestsReducer = createSlice({
  name: "requests",
  initialState: {
    requests: {
      currentrequests: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    requestsStart: (state) => {
      state.requests.fetching = true;
    },
    requestsSuccess: (state, action) => {
      state.requests.isFetching = false;
      state.requests.currentrequests = action.payload;
    },
    requestsFailed: (state) => {
      state.requests.error = true;
    },
  },
});

export const { requestsStart, requestsSuccess, requestsFailed } = reqestsReducer.actions;

export default reqestsReducer.reducer;