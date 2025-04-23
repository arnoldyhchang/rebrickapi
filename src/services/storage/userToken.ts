const tokenStr = 'userToken';

// map local storge null to be undefined to work better with useContext
export const getToken = () => localStorage.getItem(tokenStr) ?? undefined;

export const removeToken = () => localStorage.removeItem(tokenStr);

export const setToken = (token: string) => localStorage.setItem(tokenStr, token);
