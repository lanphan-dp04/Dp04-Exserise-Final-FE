import axios from "axios";
import { useEffect } from "react";
import { requestsFailed, requestsStart, requestsSuccess } from "../reducers/requestsReducer";



export const requests = async (data,dispatch, navigate) => {
  
  dispatch(requestsStart());
  try {
      dispatch(requestsSuccess(data))
  } catch (error) {
    dispatch(requestsFailed());
  }
};