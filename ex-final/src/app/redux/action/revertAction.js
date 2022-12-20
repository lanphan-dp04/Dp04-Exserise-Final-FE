import axios from "axios";
import { revertedFailed, revertedStart, revertedSuccess } from "../reducers/revertReducer";



export const reverted = async (data,dispatch, navigate) => {
  const API_REVERTED_REQUEST = process.env.REACT_APP_API_REVERTED;
  dispatch(revertedStart());
  try {
    const res = await axios.post(API_REVERTED_REQUEST, data);
      dispatch(revertedSuccess(res.data))
  } catch (error) {
    dispatch(revertedFailed());
  }
};