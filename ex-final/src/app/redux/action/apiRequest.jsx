import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../reducers/authSlice";

const handleErrorLogin = () => {
  const notiError = document.querySelector('.desc-error-login');
  if(notiError) {
    notiError.remove();
  }
  const pErrorLogin = document.createElement('p');
  pErrorLogin.classList.add('desc-error-login');
  pErrorLogin.textContent = 'You entered the wrong email or password !!!';

  document.querySelector('.js-err-login').appendChild(pErrorLogin);
}

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/login",
      user
    );
    if(res) {
      const token = res.data;
      const user =  await axios.get(
        "http://localhost:5000/user", { headers: {"authorization" : `Bearer ${token}`} });
      localStorage.setItem("token", token);
      dispatch(loginSuccess(user.data));
      switch(user.data.role) {
        case 0:
          navigate("/admin");
          break;
        default:
          navigate("/");
      }
    }
  } catch (error) {
    dispatch(loginFailed());
    if((error.response.status) === 401) {
      // 
      handleErrorLogin()
    }
  }
};
