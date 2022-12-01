import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../reducers/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://6361ddfc7521369cd05fab83.mockapi.io/api/user",
      user
    );
    console.log("test", res.data);

    const token = res.data.token;
    localStorage.setItem("token", token);

    dispatch(loginSuccess(res.data));

    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
    console.log("error", error);
  }
};
