import api from "./api";
import TokenService from "./token.service";

const activateAccount = () => {
  return api.post("/auth/activate", {
    password,
  });
};

const deactivateAccount = (password) => {
  return api.post("/auth/deactivate", {
    password,
  });
};

const updateName = (Name) => {
  return api.post("/auth/update-name", { Name }).then((res) => {
    return { name: res.data?.Name, message: res.data?.message };
  });
};

const updateEmail = (email, password) => {
  //@TODO if doesn't return resend the previous email. Get User from Token Service
  return api.post("/auth/update-email", { email, password }).then((res) => {
    return { email: res.data?.email, message: res.data?.message };
  });
};

const updatePassword = (password, newPassword) => {
  return api
    .post("/auth/change-password", {
      "current-password": password,
      "new-password": newPassword,
    })
    .then((res) => res.data.message);
};

const deleteAccount = (password) => {
  return api.post("/auth/delete-account", { password });
};

const forgetPassword = (email) => {
  return api.post("/auth/forget-account", { email });
};

const getSubscription = () => {
  return api.get("/auth/user-subscription").then((res) => {
    TokenService.setSubscription(res.data);
    return res.data;
  });
};

const UserService = {
  deactivateAccount,
  activateAccount,
  updateName,
  updateEmail,
  updatePassword,
  deleteAccount,
  forgetPassword,
  getSubscription,
};

export default UserService;
