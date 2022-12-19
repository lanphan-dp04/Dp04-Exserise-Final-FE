import axios from "axios";
import { updateDayOffFailed, updateDayOffStart, updateDayOffSuccess } from "../reducers/updateDayOffReducer";


export const updateDayOff = async (data, dispatch, navigate) => {
  const API_UPDATED = process.env.REACT_APP_API_UPDATED;
  dispatch(updateDayOffStart());
  try {
    const res = await axios.post(API_UPDATED, data);
    if(res.status === 200) {
      dispatch(updateDayOffSuccess(res.data))
      navigate('/requests')
    }
  } catch (error) {
    console.log(error);
    dispatch(updateDayOffFailed());
  }
};
