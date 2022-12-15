import axios from "axios";
import { changedFailed, changedStart, changedSuccess } from "../reducers/changeReducer";



export const changed = async (changed,dispatch, navigate) => {
  console.log(changed);
  dispatch(changedStart());
  try {
    const res = await axios.post("http://localhost:5000/requests/change", changed);
    console.log(res);
      dispatch(changedSuccess(res.data))
  } catch (error) {
    dispatch(changedFailed());
  }
};