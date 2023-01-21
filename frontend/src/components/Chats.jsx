import axios from 'axios';
import { RxTriangleDown } from 'react-icons/rx';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { AuthContext } from '../context/AuthContext';

import Chat from './Chat';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  padding: var(--padding);
`;

const Button = styled.button`
  text-align: left;
  padding: var(--padding);
  padding-left: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-top: 1rem;
`;

const Arrow = styled.span`
  display: flex;
  justify-content: flex-start;
  transition: transform 0.1s ease-in-out;
  transform: ${({ expandChats }) => (expandChats ? 'rotate(0deg)' : 'rotate(-90deg)')};
`;

const ChatsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: ${({ expandChats }) => (expandChats ? '100%' : '0')};
  overflow: hidden;
  padding-left: var(--padding);
`;

function Chats({ chats, setCurrentChat }) {
  const [expandChats, setExpandChats] = useState(true);

  return (
    <Wrapper>
      <Button onClick={() => setExpandChats((prev) => !prev)}>
        <Arrow expandChats={expandChats}>
          <RxTriangleDown size="1.5rem" />
        </Arrow>
        Direct Messages
      </Button>
      <ChatsSection expandChats={expandChats}>
        {chats.map((chat) => (
          <Chat onClick={() => setCurrentChat(chat)} key={chat._id} chat={chat} />
        ))}
      </ChatsSection>
    </Wrapper>
  );
}

export default Chats;
