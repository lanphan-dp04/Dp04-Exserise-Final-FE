export default function hasJWT() {
  //check user has JWT token
  const flag = localStorage.getItem("token") ? true : false;

  return flag;
}
