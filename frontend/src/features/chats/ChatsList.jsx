import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChat, selectSortedChats, selectCurrentChat } from './chatsSlice';
import { setShowSettings } from 'features/settings/settingsSlice';

import DropdownList from 'components/common/DropdownList';
import Chat from './Chat';

const Wrapper = styled.section`
  overflow-y: auto;
  padding-top: 1rem;
`;

function ChatsList() {
  const dispatch = useDispatch();
  const chats = useSelector(selectSortedChats);
  const currentChat = useSelector(selectCurrentChat);

  const handleFriendClick = (chat) => {
    dispatch(setShowSettings(false));
    dispatch(setCurrentChat(chat));
  };

  return (
    <Wrapper>
      <DropdownList title="Direct messages">
        {chats.map((chat) => (
          <Chat
            key={chat._id}
            chat={chat}
            currentChat={currentChat}
            onClick={() => handleFriendClick(chat)}
          />
        ))}
      </DropdownList>
    </Wrapper>
  );
}

export default ChatsList;
