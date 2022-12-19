import axios from "axios";
import { changedFailed, changedStart, changedSuccess } from "../reducers/changeReducer";



export const changed = async (changed,dispatch, navigate) => {
  const API_CHANGED_REQUEST = process.env.REACT_APP_API_CHANGED;

  console.log(changed);
  dispatch(changedStart());
  try {
    const res = await axios.post(API_CHANGED_REQUEST, changed);
    console.log(res);
      dispatch(changedSuccess(res.data))
  } catch (error) {
    dispatch(changedFailed());
  }
};