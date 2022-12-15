import axios from "axios";
import { requestsDetailFailed, requestsDetailStart, requestsDetailSuccess } from "../reducers/requestsDetailReducer";



export const requestsDetail = async (data,dispatch, navigate) => {
  
  dispatch(requestsDetailStart());
  try {
      dispatch(requestsDetailSuccess(data))
  } catch (error) {
    dispatch(requestsDetailFailed());
  }
};