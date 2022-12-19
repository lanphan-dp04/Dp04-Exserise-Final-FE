import axios from "axios";
import { rejectedFailed, rejectedStart, rejectedSuccess } from "../reducers/rejectReducer";



export const rejected = async (reject,dispatch, navigate) => {
  const API_REJECTED = process.env.REACT_APP_API_REJECTED;
  dispatch(rejectedStart());
  try {
    const res = await axios.post(API_REJECTED, reject);
    console.log(res);
      dispatch(rejectedSuccess(res.data))
  } catch (error) {
    dispatch(rejectedFailed());
  }
};