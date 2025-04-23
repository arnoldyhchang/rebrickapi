import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken, setToken } from '../services/storage/userToken';

interface IAuthContext {
  userToken: string | undefined;
  updateUserToken: (token: string | undefined) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: IProps) => {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setUserToken(getToken());
  }, []);

  const updateUserToken = (token: string | undefined) => {
    if (token) {
      setToken(token);
      setUserToken(token);
    } else {
      removeToken();
      setUserToken(undefined);
    }
  };

  return <AuthContext.Provider value={{ userToken, updateUserToken }}>{children}</AuthContext.Provider>;
};

// simple hook for easier usage
export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('Please use within AuthContext Provider');
  }

  return authContext;
};
