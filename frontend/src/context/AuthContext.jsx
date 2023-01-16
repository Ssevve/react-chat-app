import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};
