import axiosInstance from '../api/api';
import tokenService from './token.service'
import router from "@/router";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = tokenService.getLocalAccessToken();
          if(token) {
                config.headers["x-access-token"] = token;
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
                        const {accessToken, refreshToken} = res.data.result;
                        store.dispatch('auth/refreshToken', accessToken);
                        tokenService.updateLocalTokens(accessToken, refreshToken);

                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        store.dispatch('auth/logout');
                        await router.push("/login");
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    )
}

export default setup;

