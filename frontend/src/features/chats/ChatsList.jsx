import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
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
  const chats = useSelector(selectAllChats);
  const currentChat = useSelector(selectCurrentChat);

  if (!chats) dispatch(fetchChats());

  return (
    <Wrapper>
      <DropdownList title="Direct messages">
        {chats?.length
          ? chats.map((chat) => (
              <Chat
                key={chat._id}
                chat={chat}
                currentChat={currentChat}
                onClick={() => dispatch(setCurrentChat(chat))}
              />
            ))
          : null}
      </DropdownList>
    </Wrapper>
  );
}

export default ChatsList;
