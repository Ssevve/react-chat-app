import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from 'hooks/useAuth';

export const ChatsContext = createContext(null);

export const ChatsContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { auth } = useAuth();

  const fetchChats = async () => {
    try {
      const res = await axios.get('/chats', {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setChats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <ChatsContext.Provider value={{ chats, setChats, currentChat, setCurrentChat }}>
      {children}
    </ChatsContext.Provider>
  );
};
