import axiosInstance from '../api/api';
import tokenService from './token.service'
import router from "@/router";
import axios from "axios";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
          const accessToken = tokenService.getLocalAccessToken();

          if(accessToken) {
            config.headers["x-access-token"] = accessToken;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
      async (err) => {
            const originalConfig = err.config;
            if(originalConfig.url !== '/auth/login' && err.response) {
              // Access Token was expired
              if (err.response.status === 401 && !originalConfig.retry) {
                originalConfig.retry = true;
                try {
                  const res = await axiosInstance.post("/auth/refresh-token", {
                    refreshToken: tokenService.getLocalRefreshToken(),
                  });
                  const {access_token, refresh_token} = res.data.result;
                  store.dispatch('auth/refreshToken', access_token);
                  tokenService.updateLocalTokens(access_token, refresh_token);

                  return axiosInstance(originalConfig);
                } catch (error) {
                  store.dispatch('auth/logout');
                  await router.push("/login");
                  return Promise.reject(error);
                }
              }
            }
            return Promise.reject(err);
        }
    )
}

export default setup;

