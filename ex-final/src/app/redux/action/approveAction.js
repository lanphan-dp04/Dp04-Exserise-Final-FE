import axios from "axios";
import { approvedFailed, approvedStart, approvedSuccess } from "../reducers/approveReducer";

export const approved = async (approved, dispatch, navigate) => {
  const LINK_API = process.env.REACT_APP_API;
  dispatch(approvedStart());
  try {
    const res = await axios.post(`${LINK_API}/requests/approve`, approved);
      dispatch(approvedSuccess(res.data));
      
  } catch (error) {
    dispatch(approvedFailed());
  }
};

