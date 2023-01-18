import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Chats() {
  const { auth } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get('/chats');
        console.log(res.data);
        setChats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, []); // Add messages to dependency array at take them as a prop, or use context

  return <div>Chats</div>;
}

export default Chats;
