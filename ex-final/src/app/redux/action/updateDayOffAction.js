import axios from "axios";
import { updateDayOffFailed, updateDayOffStart, updateDayOffSuccess } from "../reducers/updateDayOffReducer";


export const updateDayOff = async (data, dispatch, navigate) => {
  dispatch(updateDayOffStart());
  try {
    const res = await axios.post("http://localhost:5000/dayoff/update", data);
    if(res.status === 200) {
      dispatch(updateDayOffSuccess(res.data))
      navigate('/requests')
    }
  } catch (error) {
    console.log(error);
    dispatch(updateDayOffFailed());
  }
};
