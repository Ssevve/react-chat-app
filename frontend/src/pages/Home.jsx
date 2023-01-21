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
  const [currentChatId, setCurrentChatId] = useState(undefined);

  useEffect(() => {
    socket.current = io('ws://localhost:5000');

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
        <Leftbar chats={chats} expanded={expandLeftbar} setCurrentChatId={setCurrentChatId} />
        <Chatbox socket={socket} messages={messages[currentChatId]} />
        <Rightbar expanded={expandRightbar} setCurrentChatId={setCurrentChatId} />
      </Main>
    </Wrapper>
  );
}

export default Home;
