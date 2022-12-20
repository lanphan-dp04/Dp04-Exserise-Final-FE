import axios from "axios";
import { revertedFailed, revertedStart, revertedSuccess } from "../reducers/revertReducer";



export const reverted = async (data,dispatch, navigate) => {
  // const API_REVERTED_REQUEST = process.env.REACT_APP_API_REVERTED;
  // console.log('API_REVERTED_REQUEST',API_REVERTED_REQUEST);
  dispatch(revertedStart());
  try {
    const res = await axios.post('http://localhost:5000/dayoff/revert', data);
    console.log(res);
      dispatch(revertedSuccess(res.data))
  } catch (error) {
    dispatch(revertedFailed());
  }
};