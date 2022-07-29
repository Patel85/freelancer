import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "@redux/actions";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      let State = store.getState();
      const token = TokenService.getLocalAccessToken() || State?.Auth?.token;
      if (token) {
        config.headers["Authorization"] = "Token " + token; // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      // @TODO ==> Backend /auth/refreshToken isn't ready
      // const originalConfig = err.config;

      // if (originalConfig.url !== "/signin" && err.response) {
      //   // Access Token was expired
      //   if (err.response.status === 401 && !originalConfig._retry) {
      //     originalConfig._retry = true;

      //     try {
      //       const rs = await axiosInstance.post("/auth/refreshtoken", {
      //         refreshToken: TokenService.getLocalRefreshToken(),
      //       });

      //       const { Token: accessToken } = rs.data;

      //       dispatch(refreshToken(accessToken));
      //       TokenService.updateLocalAccessToken(accessToken);

      //       return axiosInstance(originalConfig);
      //     } catch (_error) {
      //       return Promise.reject(_error);
      //     }
      //   }
      // }

      return Promise.reject(err);
    }
  );
};

export default setup;
