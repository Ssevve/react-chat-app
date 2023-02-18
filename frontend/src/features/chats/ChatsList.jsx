import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChat, selectSortedChats, selectCurrentChat } from './chatsSlice';
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
  const chats = useSelector(selectSortedChats);
  const currentChat = useSelector(selectCurrentChat);

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
