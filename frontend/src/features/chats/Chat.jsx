import styled from 'styled-components/macro';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import styleConstants from 'shared/styleConstants';

import UserAvatarWithStatus from 'components/common/UserAvatarWithConnectionStatus';
import { selectUser } from 'features/auth/authSlice';
import { selectCurrentChat } from './chatsSlice';

const Button = styled.button`
  display: flex;
  font-family: var(--font-family);
  min-width: 100%;
  align-items: center;
  background: inherit;
  border: none;
  gap: ${styleConstants.gapXL};
  padding: ${styleConstants.paddingL};
  transition: border-left 0.1s ease-in-out;
  color: ${({ theme }) => theme.text};
  opacity: ${styleConstants.dimOpacity};
  cursor: pointer;
  &:hover {
    opacity: 1;
    background: ${({ theme }) => theme.itemHoverBackground};
  }

  ${({ currentChat, chat, theme }) =>
    currentChat?._id === chat?._id && {
      opacity: 1,
      background: theme.itemHoverBackground,
      borderLeft: `6px solid ${theme.primary}`,
    }};
`;

const Details = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Meta = styled.section`
  display: flex;
  gap: ${styleConstants.gapM};
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
