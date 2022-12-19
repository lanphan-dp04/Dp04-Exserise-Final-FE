import axios from "axios";
import { approvedFailed, approvedStart, approvedSuccess } from "../reducers/approveReducer";

export const approved = async (approved, dispatch, navigate) => {
  const API_APPROVED_REQUEST = process.env.REACT_APP_API_APPROVED;
  dispatch(approvedStart());
  try {
    const res = await axios.post(API_APPROVED_REQUEST, approved);
      dispatch(approvedSuccess(res.data));
      
  } catch (error) {
    dispatch(approvedFailed());
  }
};

