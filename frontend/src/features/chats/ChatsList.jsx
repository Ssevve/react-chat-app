import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'features/auth/authSlice';
import { fetchChats, setCurrentChat, selectAllChats, selectCurrentChat } from './chatsSlice';

import DropdownList from 'components/common/DropdownList';
import Chat from './Chat';

const Wrapper = styled.section`
  overflow-y: auto;
  padding-top: 1rem;
`;

function ChatsList() {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const chats = useSelector(selectAllChats);
  // const sortedChats = chats.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const currentChat = useSelector(selectCurrentChat);

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchChats(accessToken));
  }, [accessToken, dispatch]);

  return (
    <Wrapper>
      {chats?.length ? (
        <DropdownList title="Direct messages">
          {chats.map((chat) => (
            <Chat
              key={chat._id}
              chat={chat}
              currentChat={currentChat}
              onClick={() => dispatch(setCurrentChat(chat))}
            />
          ))}
        </DropdownList>
      ) : (
        <p>You have no chats.</p>
      )}
    </Wrapper>
  );
}

export default ChatsList;
