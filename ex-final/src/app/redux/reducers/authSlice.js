import { createSlice } from "@reduxjs/toolkit";

const autheSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },

  reducers: {
    loginStart: (state) => {
      state.login.fetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const { loginFailed, loginStart, loginSuccess } = autheSlice.actions;

export default autheSlice.reducer;
