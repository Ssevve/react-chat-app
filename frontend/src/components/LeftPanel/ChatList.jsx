import styled from 'styled-components';

import DropdownList from '../common/DropdownList';
import Chat from './Chat';

const Wrapper = styled.section`
  margin-top: 1rem;
`;

function ChatList({ chats, currentChat, setCurrentChat }) {
  return (
    <Wrapper>
      <DropdownList title="Direct messages">
        {chats &&
          chats.map((chat) => (
            <Chat
              key={chat._id}
              chat={chat}
              currentChat={currentChat}
              onClick={() => setCurrentChat(chat)}
            />
          ))}
      </DropdownList>
    </Wrapper>
  );
}

export default ChatList;
