import axios from "axios";
import { updateDayOffFailed, updateDayOffStart, updateDayOffSuccess } from "../reducers/updateDayOffReducer";


export const updateDayOff = async (data, dispatch, navigate) => {
  const LINK_API = process.env.REACT_APP_API;
  dispatch(updateDayOffStart());
  try {
    const res = await axios.post(`${LINK_API}/dayoff/update`, data);
    if(res.status === 200) {
      dispatch(updateDayOffSuccess(res.data))
      navigate('/requests')
    }
  } catch (error) {
    dispatch(updateDayOffFailed());
  }
};
