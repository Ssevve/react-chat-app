import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
import useAuth from 'hooks/useAuth';
import { format } from 'timeago.js';

import UserAvatarWithStatus from '../../../../components/common/UserAvatarWithStatus';

const Button = styled.button`
  display: flex;
  min-width: 100%;
  align-items: center;
  background: ${({ currentChat, chat }) =>
    currentChat?._id === chat?._id ? 'var(--clr-light-200)' : 'var(--clr-light-400)'};
  border: none;
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

const Meta = styled.section`
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
  text-align: left;
`;

function Chat({ chat, currentChat, onClick }) {
  const { auth } = useAuth();
  const [chatPartner, setChatPartner] = useState(null);

  useEffect(() => {
    const partner = chat.members.find((member) => member._id !== auth.user._id);
    setChatPartner(partner);
  }, []);

  return chatPartner ? (
    <>
      <Button currentChat={currentChat} chat={chat} type="button" onClick={onClick}>
        <UserAvatarWithStatus user={chatPartner} />
        <Details>
          <Meta>
            <Username>{chatPartner.username}</Username>
            <Time>{format(chat.lastMessage.createdAt)}</Time>
          </Meta>
          <LastMessage>{chat.lastMessage.content}</LastMessage>
        </Details>
      </Button>
    </>
  ) : null;
}

export default Chat;
