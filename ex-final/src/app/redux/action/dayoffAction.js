import axios from "axios";
import { dayOffFailed, dayOffStart, dayOffSuccess } from "../reducers/dayoffReducer";


export const requestDayOff = async (dayoff, dispatch, navigate) => {
  const API_CREATED_DAYOFF = process.env.REACT_APP_API_CREATED_DAYOFF;
  dispatch(dayOffStart());
  try {
    const res = await axios.post(API_CREATED_DAYOFF, dayoff);
    if(res.status === 200) {
      dispatch(dayOffSuccess(res.data))
      navigate('/requests')
    }
  } catch (error) {
    dispatch(dayOffFailed());
  }
};
