import api from "./api";
import TokenService from "./token.service";
import cookieCutter from "cookie-cutter";

const register = (data) => {
  let registerAccount = {};

  if (!data.isIndividual)
    registerAccount = {
      email: data.email,
      password: data.password,
      isIndividual: data.isIndividual,
      Mobile: data.mobile,
      Country: data.country,
      Organisation: data.name,
      members: data.members,
      Profession: data.profession,
      username: data.username || data.email,
      Name: data.username || data.email,
    };

  if (data.isIndividual)
    registerAccount = {
      email: data.email,
      password: data.password,
      isIndividual: data.isIndividual,
      Mobile: data.mobile,
      Country: data.country,
      Profession: data.profession,
      username: data.username || data.email,
      Name: data.name || data.username || data.email,
    };

  return api.post("/auth/create_user", registerAccount).then((response) => {
    if (response.data.Token) {
      TokenService.setUser({
        user: response.data.user,
        accessToken: response.data.Token,
      });
    }
    
    return response.data;
  });
};

const login = (email, password) => {
  return api
    .post("/auth/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response)
      if (response.data.Token) {
        TokenService.setUser({
          user: response.data.user,
          accessToken: response.data.Token,
        });
      }

      return response.data;
    });
};

const logout = () => {
  cookieCutter.set("token", null);
  TokenService.removeUser();
};

const getCurrentUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let Token = user?.accessToken || null;
  let subscription = JSON.parse(localStorage.getItem("subscription"));
  return { user, subscription, Token };
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
