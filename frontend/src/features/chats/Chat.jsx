import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';

import UserAvatarWithStatus from 'components/common/UserAvatarWithConnectionStatus';
import { selectUser } from 'features/auth/authSlice';
import { selectCurrentChat } from './chatsSlice';

const Button = styled.button`
  display: flex;
  min-width: 100%;
  align-items: center;
  background: inherit;
  border: none;
  gap: 1rem;
  padding: 1rem var(--padding);
  transition: all 0.1s ease-in-out;
  cursor: pointer;

  ${({ currentChat, chat }) =>
    currentChat?._id === chat?._id && {
      background: 'var(--clr-light-300)',
      borderLeft: '6px solid var(--clr-accent)',
    }};
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

function Chat({ chat, onClick }) {
  const currentChat = useSelector(selectCurrentChat);
  const loggedInUser = useSelector(selectUser);
  const [chatPartner, setChatPartner] = useState(null);

  useEffect(() => {
    const partner = chat.members.find((member) => member._id !== loggedInUser._id);
    setChatPartner(partner);
  }, [chat, loggedInUser._id]);

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
