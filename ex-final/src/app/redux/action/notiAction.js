import { notificationFailed, notificationStart, notificationSuccess } from "../reducers/notiReducer";

export const notification = async (data, dispatch, navigate) => {

  dispatch(notificationStart());
  try {
      dispatch(notificationSuccess(data));
      
  } catch (error) {
    dispatch(notificationFailed());
  }
};

