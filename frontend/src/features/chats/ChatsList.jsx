import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats, setCurrentChat, selectAllChats, selectCurrentChat } from './chatsSlice';
import useAuth from 'hooks/useAuth';

import DropdownList from 'components/common/DropdownList';
import Chat from './Chat';

const Wrapper = styled.section`
  margin-top: 1rem;
`;

function ChatsList() {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const chats = useSelector(selectAllChats);
  const currentChat = useSelector(selectCurrentChat);

  useEffect(() => {
    dispatch(fetchChats(auth.accessToken));
  }, []);

  return (
    <Wrapper>
      <DropdownList title="Direct messages">
        {chats.length
          ? chats.map((chat) => (
              <Chat
                key={chat._id}
                chat={chat}
                currentChat={currentChat}
                onClick={() => dispatch(setCurrentChat(chat))}
              />
            ))
          : null}
        {chats.error ? <p>{chats.error}</p> : null}
      </DropdownList>
    </Wrapper>
  );
}

export default ChatsList;
