import { createSlice } from "@reduxjs/toolkit";

const notiReducer = createSlice({

  name: "Notification",
  initialState: {
    notification: {
      fetching: false,
      currentNotification: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    notificationStart: (state) => {
      state.notification.isFetching = false;
      state.notification.fetching = true;
    },
    notificationSuccess: (state, action) => {
      state.notification.isFetching = true;
      state.notification.currentNotification = action.payload;
    },
    notificationFailed: (state) => {
      state.notification.error = true;
    },

  },
});

export const { notificationStart, notificationSuccess, notificationFailed } = notiReducer.actions;

export default notiReducer.reducer;