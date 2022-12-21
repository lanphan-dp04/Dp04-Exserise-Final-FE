import axios from "axios";
import { dayOffFailed, dayOffStart, dayOffSuccess } from "../reducers/dayoffReducer";


export const requestDayOff = async (dayoff, dispatch, navigate) => {
  const LINK_API = process.env.REACT_APP_API;
  dispatch(dayOffStart());
  try {
    const res = await axios.post(`${LINK_API}/dayoff/create`, dayoff);
    if(res.status === 200) {
      dispatch(dayOffSuccess(res.data))
      navigate('/requests')
    }
  } catch (error) {
    dispatch(dayOffFailed());
  }
};
