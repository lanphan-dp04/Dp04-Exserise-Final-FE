import axios from "axios";
import { rejectedFailed, rejectedStart, rejectedSuccess } from "../reducers/rejectReducer";



export const rejected = async (reject,dispatch, navigate) => {
  const LINK_API = process.env.REACT_APP_API;
  dispatch(rejectedStart());
  try {
    const res = await axios.post(`${LINK_API}/requests/reject`, reject);
      dispatch(rejectedSuccess(res.data))
  } catch (error) {
    dispatch(rejectedFailed());
  }
};