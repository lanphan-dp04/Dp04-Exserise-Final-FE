import { createSlice } from "@reduxjs/toolkit";

const reqestsReducer = createSlice({
  name: "requests",
  initialState: {
    requests: {
      fetching: false,
      currentRequests: null,
      isFetching: false,
      error: false,
    },
  },


  reducers: {
    requestsStart: (state) => {
      state.requests.isFetching = false;
      state.requests.fetching = true;
    },
    requestsSuccess: (state, action) => {
      state.requests.isFetching = true;
      state.requests.currentRequests = action.payload;
    },
    requestsFailed: (state) => {
      state.requests.error = true;
    },
  },
});

export const { requestsStart, requestsSuccess, requestsFailed } = reqestsReducer.actions;

export default reqestsReducer.reducer;