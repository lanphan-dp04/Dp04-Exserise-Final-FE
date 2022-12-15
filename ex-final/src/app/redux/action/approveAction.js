import axios from "axios";
import { approvedFailed, approvedStart, approvedSuccess } from "../reducers/approveReducer";

export const approved = async (approved, dispatch, navigate) => {
  dispatch(approvedStart());
  try {
    const res = await axios.post("http://localhost:5000/requests/approve", approved);
      dispatch(approvedSuccess(res.data));
      
  } catch (error) {
    dispatch(approvedFailed());
  }
};

