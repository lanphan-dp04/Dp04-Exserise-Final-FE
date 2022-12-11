import axios from "axios";
import { requestsFailed, requestsStart, requestsSuccess } from "../reducers/requestsReducer";


export const requests = async (id, dispatch, navigate) => {
  console.log('id',id);
  dispatch(requestsStart());
  try {
    const res = await axios.get(`http://localhost:5000/requests/${id}` );
    console.log('res',res);
    if(res.status === 200) {
      console.log(res.data);
      dispatch(requestsSuccess(res.data))
      navigate('/create-request')
    }
  } catch (error) {
    dispatch(requestsFailed());
  }
};