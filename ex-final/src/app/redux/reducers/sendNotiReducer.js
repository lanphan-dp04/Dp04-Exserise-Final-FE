import { createSlice } from "@reduxjs/toolkit";

const sendNotiReducer = createSlice({

  name: "sendNoti",
  initialState: {
    sendNoti: {
      fetching: false,
      currentSendNoti: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    sendNotiStart: (state) => {
      state.sendNoti.isFetching = false;
      state.sendNoti.fetching = true;
    },
    sendNotiSuccess: (state, action) => {
      state.sendNoti.isFetching = true;
      state.sendNoti.currentSendNoti = action.payload;
    },
    sendNotiFailed: (state) => {
      state.sendNoti.error = true;
    },

  },
});

export const { sendNotiStart, sendNotiSuccess, sendNotiFailed } = sendNotiReducer.actions;

export default sendNotiReducer.reducer;