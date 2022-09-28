import api from '../api/api';
import tokenService from "@/services/token.service";

const authService = {
    login: async ({username, password}) => {
        return api
            .post('auth/login', {
                username,
                password
            })
            .then(response => {
                if (response.data.result.accessToken) {
                    tokenService.setUser(response.data.result)
                }
                return response.data.result;
            });
    },
    logout: async () => {
      await api
        .post('auth/logout', {
          refreshToken: tokenService.getLocalRefreshToken()
        })
      return tokenService.removeUser();
    },

}
export default authService
