import { configureStore } from "@reduxjs/toolkit";
import { requestsDetail } from "./action/requestsDetailAction";
import approveReducer from "./reducers/approveReducer";
import authSlice from "./reducers/authSlice";
import changeReducer from "./reducers/changeReducer";
import dayoffReducer from "./reducers/dayoffReducer";
import rejectReducer from "./reducers/rejectReducer";
import requestsDetailReducer from "./reducers/requestsDetailReducer";
import reqestsReducer from "./reducers/requestsReducer";
import revertReducer from "./reducers/revertReducer";
import updateDayOffReducer from "./reducers/updateDayOffReducer";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dayoff: dayoffReducer,
    requests: reqestsReducer,
    approved: approveReducer,
    rejected: rejectReducer,
    changed: changeReducer,
    revert: revertReducer,
    requestsDetail: requestsDetailReducer,
    updateDayOff: updateDayOffReducer,
  },
});
