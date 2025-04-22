const tokenStr = 'userToken';

export const getToken = () => localStorage.getItem(tokenStr);

export const removeToken = () => localStorage.removeItem(tokenStr);

export const setToken = (token: string) => localStorage.setItem(tokenStr, token);
