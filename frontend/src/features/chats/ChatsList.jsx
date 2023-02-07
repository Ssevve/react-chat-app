import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats, setCurrentChat, selectAllChats, selectCurrentChat } from './chatsSlice';

import DropdownList from 'components/common/DropdownList';
import Chat from './Chat';

const Wrapper = styled.section`
  margin-top: 1rem;
`;

function ChatsList() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const chats = useSelector(selectAllChats);
  const currentChat = useSelector(selectCurrentChat);

  useEffect(() => {
    dispatch(fetchChats(auth.accessToken));
  }, [auth.accessToken, dispatch]);

  return (
    <Wrapper>
      {chats ? (
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
