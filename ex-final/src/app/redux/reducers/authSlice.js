import { createSlice } from "@reduxjs/toolkit";

const autheSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      isLogin: false,
      isToken: null
    },
  },

  reducers: {
    loginStart: (state) => {
      state.login.fetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.isLogin = true;
    },
    loginToken: (state, action) => {
      state.login.isToken = action.payload;
    },
    loginFailed: (state) => {
      state.login.error = true;
    },
  },
});

export const { loginFailed, loginStart, loginSuccess, loginToken } = autheSlice.actions;

export default autheSlice.reducer;
