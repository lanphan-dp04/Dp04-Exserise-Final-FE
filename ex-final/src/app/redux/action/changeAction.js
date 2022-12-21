import axios from "axios";
import { changedFailed, changedStart, changedSuccess } from "../reducers/changeReducer";



export const changed = async (changed,dispatch, navigate) => {
  const LINK_API = process.env.REACT_APP_API;

  dispatch(changedStart());
  try {
    const res = await axios.post(`${LINK_API}/requests/change`, changed);
      dispatch(changedSuccess(res.data))
  } catch (error) {
    dispatch(changedFailed());
  }
};