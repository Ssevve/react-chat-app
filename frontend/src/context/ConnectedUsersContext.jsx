import { createContext, useState } from 'react';

export const ConnectedUsersContext = createContext(null);

export const ConnectUsersContextProvider = ({ children }) => {
  const [connectedUsers, setConnectedUsers] = useState({});

  return (
    <ConnectedUsersContext.Provider value={{ connectedUsers, setConnectedUsers }}>
      {children}
    </ConnectedUsersContext.Provider>
  );
};
