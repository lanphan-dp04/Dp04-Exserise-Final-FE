import { createSlice } from "@reduxjs/toolkit";

const requestsDetailReducer = createSlice({
  name: "requestsDetail",
  initialState: {
    requests: {
      fetching: false,
      currentRequestsDetail: null,
      isFetching: false,
      error: false,
    },
  },


  reducers: {
    requestsDetailStart: (state) => {
      state.requests.isFetching = false;
      state.requests.fetching = true;
    },
    requestsDetailSuccess: (state, action) => {
      state.requests.isFetching = true;
      state.requests.currentRequestsDetail = action.payload;
    },
    requestsDetailFailed: (state) => {
      state.requests.error = true;
    },
  },
});

export const { requestsDetailStart, requestsDetailSuccess, requestsDetailFailed } = requestsDetailReducer.actions;

export default requestsDetailReducer.reducer;