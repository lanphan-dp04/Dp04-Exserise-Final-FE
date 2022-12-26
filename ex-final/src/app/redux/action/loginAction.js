import axios from "axios";
import { listKey, setData } from "../../helpers/common";
import { loginFailed, loginStart, loginSuccess, loginToken } from "../reducers/authSlice";

const handleErrorLogin = () => {
  const notiError = document.querySelector(".desc-error-login");
  if (notiError) {
    notiError.remove();
  }
  const pErrorLogin = document.createElement("p");
  pErrorLogin.classList.add("desc-error-login");
  pErrorLogin.textContent = "You entered the wrong email or password !!!";

  document.querySelector(".js-err-login").appendChild(pErrorLogin);
};

export const loginUser = async (user, dispatch, navigate) => {
  const LINK_API = process.env.REACT_APP_API;
 
  dispatch(loginStart());
  try {
    const res = await axios.post(`${LINK_API}/login`, user);
    if (res) {
      setData(listKey.token, res.data)
      const token = res.data;
      const user = await axios.get(`${LINK_API}/user`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setData(listKey.user, user.data)
      dispatch(loginSuccess(user.data));
      dispatch(loginToken(token));
      switch (user.data.role) {
        case 'admin':
          navigate("/admin");
          break;
       
        default:
          navigate("/");
      }
    }
  } catch (error) {
    dispatch(loginFailed());
    if (error.response.status === 500) {
      handleErrorLogin();
    }
  }
};
