import axios from "axios";
import { sendNotiFailed, sendNotiStart, sendNotiSuccess } from "../reducers/sendNotiReducer";

export const sendNoti = async (data, dispatch, navigate) => {
  console.log('id',data);

  const LINK_API = process.env.REACT_APP_API;
  dispatch(sendNotiStart());
  try {
    const res = await axios.post(`${LINK_API}/notifies/send`, data);
    console.log('res',res);
      dispatch(sendNotiSuccess(res.data));
      
  } catch (error) {
    dispatch(sendNotiFailed());
  }
};

