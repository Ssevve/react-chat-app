import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { closeSettings } from 'features/settings/settingsSlice';

import DropdownList from 'components/common/DropdownList';
import {
  setCurrentChat,
  selectSortedChats,
  selectCurrentChat,
} from '../chatsSlice';
import Chat from '../Chat';

const Wrapper = styled.section`
  background: inherit;
  overflow-y: auto;
`;

function ChatsList() {
  const dispatch = useDispatch();
  const chats = useSelector(selectSortedChats);
  const currentChat = useSelector(selectCurrentChat);

  const handleFriendClick = (chat) => {
    dispatch(closeSettings());
    dispatch(setCurrentChat(chat));
  };

  return (
    <Wrapper>
      <DropdownList title="Direct messages" noItemPadding>
        {chats.length
          ? chats.map((chat) => (
              <Chat
                key={chat._id}
                chat={chat}
                currentChat={currentChat}
                onClick={() => handleFriendClick(chat)}
              />
            ))
          : null}
      </DropdownList>
    </Wrapper>
  );
}

export default ChatsList;
