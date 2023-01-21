import axios from 'axios';
import styled from 'styled-components/macro';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { format } from 'timeago.js';

import UserAvatar from './UserAvatar';

const Button = styled.section`
  display: flex;
  max-width: 100%;
  align-items: center;
  gap: 1rem;
  padding: var(--padding);
  transition: background 0.1s ease-in-out;
  border-radius: var(--border-radius);
  cursor: pointer;
  &:hover {
    background: var(--clr-light-200);
  }
`;

const Details = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
`;

const Time = styled.span`
  font-size: 0.75rem;
`;

const LastMessage = styled.span`
  font-size: 0.8rem;
  opacity: 0.6;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100px;
`;

function Chat({ chat, onClick }) {
  const { auth } = useContext(AuthContext);
  const [chatPartner, setChatPartner] = useState(null);

  useEffect(() => {
    const partner = chat.members.find((member) => member._id !== auth.user._id);
    setChatPartner(partner);
  }, [chat]);

  return (
    <Button onClick={onClick}>
      <UserAvatar user={chatPartner?.avatar.url} size="2.5rem" />
      <Details>
        <Meta>
          <Username>{chatPartner?.username}</Username>
          <Time>{format(chat.lastMessage.createdAt)}</Time>
        </Meta>
        <LastMessage>{chat.lastMessage.content}</LastMessage>
      </Details>
    </Button>
  );
}

export default Chat;
