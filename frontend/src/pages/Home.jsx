import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';

import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar';
import Chatbox from '../components/Chatbox';
import Rightbar from '../components/Rightbar';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  // TODO latest message state
  const [expandLeftbar, setExpandLeftbar] = useState('');
  const [expandRightbar, setExpandRightbar] = useState('');
  const socket = useRef(io('ws://localhost:5000'));
  const [currentChatId, setCurrentChatId] = useState(undefined);

  useEffect(() => {
    console.log(currentChatId);
  }, [currentChatId]);

  useEffect(() => {
    socket.current?.on('receiveMessage', (message) => {
      console.log(message);
    });

    return () => {
      socket.current?.removeAllListeners();
      socket.current?.disconnect();
    };
  }, [socket]);
  return (
    <Wrapper>
      <Topbar setExpandLeftbar={setExpandLeftbar} setExpandRightbar={setExpandRightbar} />
      <Main>
        <Leftbar expanded={expandLeftbar} setCurrentChatId={setCurrentChatId} />
        <Chatbox socket={socket} currentChatId={currentChatId} />
        <Rightbar expanded={expandRightbar} setCurrentChatId={setCurrentChatId} />
      </Main>
    </Wrapper>
  );
}

export default Home;
