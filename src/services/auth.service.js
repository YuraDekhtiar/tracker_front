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
                if (response.data.accessToken) {
                    tokenService.setUser(response.data)
                }
                return response.data;
            });
    },
    logout: () => {
        tokenService.removeUser();
    },

}
export default authService