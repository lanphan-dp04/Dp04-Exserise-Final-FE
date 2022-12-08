import { createSlice } from "@reduxjs/toolkit";

const dayoffReducer = createSlice({
  name: "dayoff",
  initialState: {
    dayoff: {
      currentDayOff: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    dayOffStart: (state) => {
      state.dayoff.fetching = true;
    },
    dayOffSuccess: (state, action) => {
      state.dayoff.isFetching = false;
      state.dayoff.currentDayOff = action.payload;
    },
    dayOffFailed: (state) => {
      state.dayoff.error = true;
    },
  },
});

export const { dayOffStart, dayOffSuccess, dayOffFailed } = dayoffReducer.actions;

export default dayoffReducer.reducer;