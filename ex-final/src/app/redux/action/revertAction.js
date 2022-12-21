import axios from "axios";
import { revertedFailed, revertedStart, revertedSuccess } from "../reducers/revertReducer";



export const reverted = async (data,dispatch, navigate) => {
  const LINK_API = process.env.REACT_APP_API;
  dispatch(revertedStart());
  try {
    const res = await axios.post(`${LINK_API}/dayoff/revert`, data);
      dispatch(revertedSuccess(res.data))
  } catch (error) {
    dispatch(revertedFailed());
  }
};