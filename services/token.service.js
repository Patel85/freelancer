import cookieCutter from "cookie-cutter";
// const token = cookieCutter.get("token");
// if (token) {
//   config.headers["Authorization"] = `Token ${token}`;
// }

const getLocalRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
};

const getLocalAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

const updateLocalAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.accessToken = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = ({ user, accessToken }) => {
  cookieCutter.set("token", accessToken);
  user.accessToken = accessToken;
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("subscription");
};

const setSubscription = (subscription) => {
  localStorage.setItem("subscription", JSON.stringify(subscription));
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  getUser,
  setUser,
  removeUser,
  setSubscription,
};

export default TokenService;
