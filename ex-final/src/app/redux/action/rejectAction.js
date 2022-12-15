import axios from "axios";
import { rejectedFailed, rejectedStart, rejectedSuccess } from "../reducers/rejectReducer";



export const rejected = async (reject,dispatch, navigate) => {
  console.log(reject);
  dispatch(rejectedStart());
  try {
    const res = await axios.post("http://localhost:5000/requests/reject", reject);
    console.log(res);
      dispatch(rejectedSuccess(res.data))
  } catch (error) {
    dispatch(rejectedFailed());
  }
};