import { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import axios from 'axios';

import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar';
import Chatbox from '../components/Chatbox';
import Rightbar from '../components/Rightbar';
import { AuthContext } from '../context/AuthContext';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  // TODO latest message state
  const { auth } = useContext(AuthContext);
  const [expandLeftbar, setExpandLeftbar] = useState('');
  const [expandRightbar, setExpandRightbar] = useState('');
  const socket = useRef(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    socket.current = io('ws://localhost:5000', { query: `userId=${auth.user._id}` });

    return () => {
      socket.current.removeAllListeners();
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current?.on('receiveMessage', (message) => {
      console.log(message);
    });
  }, [socket]);

  useEffect(() => {
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

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/messages/chats`, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
    fetchMessages();
  }, []);

  return (
    <Wrapper>
      <Topbar setExpandLeftbar={setExpandLeftbar} setExpandRightbar={setExpandRightbar} />
      <Main>
        <Leftbar chats={chats} expanded={expandLeftbar} setCurrentChat={setCurrentChat} />
        <Chatbox
          currentUser={auth.user}
          currentChat={currentChat}
          socket={socket}
          messages={messages[currentChat?._id]}
        />
        <Rightbar expanded={expandRightbar} setCurrentChat={setCurrentChat} />
      </Main>
    </Wrapper>
  );
}

export default Home;
