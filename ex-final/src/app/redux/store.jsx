import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import dayoffReducer from "./reducers/dayoffReducer";
import reqestsReducer from "./reducers/requestsReducer";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dayoff: dayoffReducer,
    requests: reqestsReducer,
  },
});
