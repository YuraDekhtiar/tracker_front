
const tokenService = {
    getLocalAccessToken: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.accessToken;
    },
    getLocalRefreshToken: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user?.refreshToken;
    },
    updateLocalTokens: (accessToken, refreshToken) => {
        const user = JSON.parse(localStorage.getItem('user'));
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        localStorage.setItem('user', JSON.stringify(user))
    },
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    },
    removeUser: () => {
        localStorage.removeItem('user');
    }
}

export default tokenService;
