import axios from "axios";
import { dayOffFailed, dayOffStart, dayOffSuccess } from "../reducers/dayoffReducer";


export const requestDayOff = async (dayoff, dispatch, navigate) => {
  dispatch(dayOffStart());
  try {
    const res = await axios.post("http://localhost:5000/dayoff/create", dayoff);
    console.log(res);
    if(res.status === 200) {
      dispatch(dayOffSuccess(res.data))
      navigate('/create-request')
    }
  } catch (error) {
    console.log(error);
    dispatch(dayOffFailed());
  }
};
