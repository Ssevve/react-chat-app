import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'features/auth/authSlice';
import { fetchChats, setCurrentChat, selectAllChats, selectCurrentChat } from './chatsSlice';
import breakpoints from 'utils/breakpoints';

import DropdownList from 'components/common/DropdownList';
import Chat from './Chat';

const Wrapper = styled.section`
  overflow-y: auto;
  padding-top: 1rem;
  @media ${breakpoints.medium} {
    border-right: 1px solid var(--clr-light-200);
  }
`;

function ChatsList() {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const chats = useSelector(selectAllChats);
  // const sortedChats = chats.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const currentChat = useSelector(selectCurrentChat);

  console.log(chats.length);
  useEffect(() => {
    if (!accessToken) return;

    if (!chats.length) {
      dispatch(fetchChats(accessToken));
    }
  }, [accessToken, dispatch]);

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default ChatsList;
