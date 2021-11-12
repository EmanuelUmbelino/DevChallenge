export const TOKEN_KEY = "@user-token";
export const USERID_KEY = "@user-id";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USERID_KEY);
export const setToken = (token: string, userId: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERID_KEY, userId);
};
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};