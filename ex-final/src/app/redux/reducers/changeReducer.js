import { createSlice } from "@reduxjs/toolkit";

const changeReducer = createSlice({

  name: "changed",
  initialState: {
    changed: {
      fetching: false,
      currentChanged: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    changedStart: (state) => {
      state.changed.isFetching = false;
      state.changed.fetching = true;
    },
    changedSuccess: (state, action) => {
      state.changed.isFetching = true;
      state.changed.currentChanged = action.payload;
    },
    changedFailed: (state) => {
      state.changed.error = true;
    },

  },
});

export const { changedStart, changedSuccess, changedFailed } = changeReducer.actions;

export default changeReducer.reducer;