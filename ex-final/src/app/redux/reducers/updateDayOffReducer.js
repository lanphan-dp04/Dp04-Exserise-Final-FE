import { createSlice } from "@reduxjs/toolkit";

const updateDayOffReducer = createSlice({
  name: "updateDayOff",
  initialState: {
    updateDayOff: {
      currentUpdateDayOff: null,
      isFetching: false,
      error: false,
      fetching: false,
    },
  },

  reducers: {
    updateDayOffStart: (state) => {
      state.updateDayOff.fetching = true;
    },
    updateDayOffSuccess: (state, action) => {
      state.updateDayOff.isFetching = true;
      state.updateDayOff.currentUpdateDayOff = action.payload;
    },
    updateDayOffFailed: (state) => {
      state.updateDayOff.error = true;
    },
  },
});

export const { updateDayOffStart, updateDayOffSuccess, updateDayOffFailed } = updateDayOffReducer.actions;

export default updateDayOffReducer.reducer;